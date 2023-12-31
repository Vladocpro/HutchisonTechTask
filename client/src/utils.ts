export enum PopupTypes {
   Create = "Create",
   Update = "Update"
}
export interface IPopup {
   open: boolean,
   type?: PopupTypes,
   category?: string,
   name?: string
}
export interface IDog {
   category: string,
   name: string
}


export const categories = [
   "affenpinscher",
   "african",
   "airedale",
   "akita",
   "appenzeller",
   "basenji",
   "beagle",
   "bluetick",
   "borzoi",
   "bouvier",
   "boxer",
   "brabancon",
   "briard",
   "bulldog",
   "bullterrier",
   "cairn",
   "chihuahua",
   "chow",
   "clumber",
   "collie",
   "corgi",
   "dachshund",
   "dane",
   "deerhound",
   "dhole",
   "dingo",
   "doberman",
   "elkhound",
   "entlebucher",
   "eskimo",
   "germanshepherd",
   "greyhound",
   "groenendael",
   "hound",
   "husky",
   "keeshond",
   "kelpie",
   "komondor",
   "kuvasz",
   "labrador",
   "leonberg",
   "lhasa",
   "malamute",
   "malinois",
   "maltese",
   "mastiff",
   "mexicanhairless",
   "mountain",
   "newfoundland",
   "otterhound",
   "papillon",
   "pekinese",
   "pembroke",
   "pinscher",
   "pointer",
   "pomeranian",
   "poodle",
   "pug",
   "pyrenees",
   "redbone",
   "retriever",
   "ridgeback",
   "rottweiler",
   "saluki",
   "samoyed",
   "schipperke",
   "schnauzer",
   "setter",
   "sheepdog",
   "shiba",
   "shihtzu",
   "spaniel",
   "springer",
   "stbernard",
   "terrier",
   "vizsla",
   "weimaraner",
   "whippet",
   "wolfhound"
]
