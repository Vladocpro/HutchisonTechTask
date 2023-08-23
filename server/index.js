import express from "express";
import cors from "cors"
import * as fs from "fs";

const PORT = process.env.PORT || 4444
const app = express();
app.use(express.json());
app.use(cors());

const file = "./assets/dogs.json"

const writeFile = (dogs) => {
   fs.writeFile(file, JSON.stringify(dogs, null, 2), err => {
      if(err) {
         console.log(err)
      }
   })
}

const convertDogsToArray = (dogs) => {
   const arrayOfDogs = []

   for (const [key, value] of Object.entries(dogs)) {
      if(value.length === 0 )
         continue;
      else {
         value.forEach((dog) => {
            arrayOfDogs.push({
               category: key,
               name: dog
            })
         })
      }

   }
   return arrayOfDogs
}


// Get all dogs
app.get('/dogs', async (req, res) => {
   try {
      const dogs = JSON.parse(await fs.readFileSync(file))
      res.json(convertDogsToArray(dogs));
   } catch (err) {
      console.log(err)
      res.status(500).json({
         message: 'Unable to get dogs'
      })
   }
})

// Get all dogs by name or category
app.get('/dogs/:search', async (req, res) => {
   try {
      const dogs = JSON.parse(await fs.readFileSync(file))
      if(req.params.search.length === 0) {
         return res.json(convertDogsToArray(dogs));
      }
      const search = req.params.search.toLowerCase()
      const arrayOfDogs = convertDogsToArray(dogs)
      const returnArray = []
      arrayOfDogs.forEach((dog) => {
         if(dog.category.includes(search) || dog.name.includes(search)) {
            returnArray.push(dog)
         }
      })
      res.json(returnArray);
   } catch (err) {
      console.log(err)
      res.status(500).json({
         message: 'Unable to get dogs'
      })
   }
})

// Create a dog
app.post('/dogs', async (req, res) => {
   try {
      const {name,category} = req.body;
      const dogs = JSON.parse(await fs.readFileSync(file))
      if(!dogs[category].includes(name)) {
         dogs[category].push(name)
      } else {
         return res.status(400).json({
            message: 'The dog with this name already exists'
         })

      }
      writeFile(dogs)
      res.json(convertDogsToArray(dogs));
   } catch (err) {
      console.log(err)
      res.status(500).json({
         message: 'Unable to get dogs'
      })
   }
})

// Update a dog
app.patch('/dogs', async (req, res) => {
   try {
      const {oldName, newName, category} = req.body;
      if(oldName === newName) {
         return res.status(500).json({
            message: 'The name is the same'
         })
      }
      const dogs = JSON.parse(await fs.readFileSync(file))
      const index = dogs[category].findIndex(dog => dog === oldName);
      if(index === -1) {
         return res.status(500).json({
            message: 'Unable to get a dog'
         })
      } else {
         dogs[category][index] = newName
      }
      writeFile(dogs)
      res.json(convertDogsToArray(dogs));
   } catch (err) {
      console.log(err)
      res.status(500).json({
         message: 'Unable to get dogs'
      })
   }
})

// Delete a dog
app.delete('/dogs', async (req, res) => {
   try {
      const dogs = JSON.parse(await fs.readFileSync(file))
      const {name, category} = req.body;
      const index = dogs[category].findIndex(dog => dog === name);
      if (index === -1) {
         return res.status(500).json({
            message: 'Could not find this dog'
         })
      } else {
         dogs[category].splice(index, 1);
      }
      writeFile(dogs)
      res.json(convertDogsToArray(dogs));
   } catch (err) {
      console.log(err)
      res.status(500).json({
         message: 'Unable to get dogs'
      })
   }
})

app.listen(PORT, (err) => {
   if(err) {
      return console.log(err)
   }
   console.log("Server working on port: " + PORT)
})
