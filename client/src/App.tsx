import React, {useEffect, useState} from 'react';
import axios from "axios";
import "./index.css"
import Popup from "./Popup";
import debounce from "lodash.debounce"
import {IDog, IPopup, PopupTypes} from "./utils";

function App() {

  const [dogs, setDogs] = useState<IDog[] | undefined>(undefined)
  const [searchValue, setSearchValue] = useState<string>("")
  const [openModal, setOpenModal] = useState<IPopup>({open: false});

  const handleDelete = async (name : string, category : string) => {
    await axios.delete(`${process.env.REACT_APP_SERVER_URL}/dogs`, {data: {name, category}})
        .then((response) => {
          setDogs(response.data)
        })
        .catch((e) => console.log(e.response.data.message))
  }




  const debouncedSearch = debounce((text) => {
    setSearchValue(text);
  }, 400);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    debouncedSearch(e.target.value);
  }
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/dogs`).then((response) => {
       setDogs(response.data)
    })
  }, []);

   useEffect(() => {
      axios.get(`${process.env.REACT_APP_SERVER_URL}/dogs/${searchValue}`)
          .then((response) => {
             setDogs(response.data)
          })
          .catch((e) => console.log(e.response.data.message))
   }, [searchValue]);


  return (
    <div className="App">
      <Popup
          popup={openModal}
          onClose={() => setOpenModal({open: false})}
          setDogs={(updatedDogs : IDog[]) => setDogs(updatedDogs)}
      />

      <div className="mainBlock">
         <div style={{margin: "0 4px"}}>
            <h1>Dogs</h1>
            <div className="topbar">
               <input placeholder="Search by name or breed" className="topbarInput" type="text"
                      onChange={(e) => handleChange(e)}
               />
               <button className="createBtn" onClick={() => setOpenModal({open: true , type: PopupTypes.Create, category: "", name: ""})}>
                  Add a new dog
               </button>
            </div>
            <ul className="dogList">
               {dogs?.map((dog: IDog) => (
                   <li className="dogItem" key={dog.category + dog.name}>
                      <div className="dogItem__labels">
                         <span>Breed: {dog.category}</span>
                         <span>Name: {dog.name}</span>
                      </div>
                      <div className="dogItem__actionBtns">
                         <button className="updateBtn" onClick={() => setOpenModal({open: true , type: PopupTypes.Update, category: dog.category, name: dog.name})}>Update</button>
                         <button className="deleteBtn" onClick={() => handleDelete(dog.name, dog.category)}>Delete</button>
                      </div>
                   </li>
               ))}
            </ul>
         </div>
      </div>
    </div>
  );
}

export default App;
