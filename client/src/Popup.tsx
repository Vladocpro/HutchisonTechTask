import React, {FC, useEffect, useState} from 'react';
import axios from "axios";
import {categories, IDog, IPopup, PopupTypes} from "./utils";



interface IPopupProps {
   popup: IPopup,
   onClose: () => void,
   setDogs: (updatedDogs: IDog[]) => void;
}

const Popup: FC<IPopupProps>  = ({popup, onClose, setDogs}) => {

   const [category, setCategory] = useState<string>(popup.category!)
   const [oldName, setOldName] = useState<string>(popup.name!)
   const [name, setName] = useState<string>(popup.name!)
   const [error, setError] = useState<string>("")
   const handleSave = async () => {
      if(popup.type === PopupTypes.Create) {
         await axios.post(`${process.env.REACT_APP_SERVER_URL}/dogs`, {name, category})
             .then((response) => {
                setDogs(response.data)
                onClose();
             })
             .catch((e) => setError(e.response.data.message))
      } else {
         await axios.patch(`${process.env.REACT_APP_SERVER_URL}/dogs`, {oldName, newName:name, category})
             .then((response) => {
                setDogs(response.data)
                onClose();
             })
             .catch((e) => setError(e.response.data.message))
      }
   }

   useEffect(() => {
      if(popup.open) {
         setCategory(popup.category!)
         setName(popup.name!)
         setOldName(popup.name!)
      }
      if(!popup.open) {
         setError("")
      }
   }, [popup.open]);

   if(!popup.open) {
      return null
   }
   return (
       <div onClick={onClose} className='overlay'>
          <div onClick={(e) => e.stopPropagation()} className='modalContainer'>
             <button style={{position: "absolute", right: "8px", top: "4px", fontSize: "18px", cursor: "pointer", zIndex: "1"}} onClick={onClose}>✖</button>

                    {category === "" ? (
                        <div className={category === "" && popup.open ? "addSlideRightAnimation" : "addSlideLeftAnimation"}>
                           <div className="categoriesTitle">Choose dog breed</div>
                           <ul className="categoriesSelect">
                              {categories.map((category) => (
                                  <li className="categoriesItem" key={category} onClick={() => setCategory(category)}>{category}</li>
                              ))}

                           </ul>
                        </div>
                       ) : (
                           <ul className={category === "" ? "addSlideRightAnimation" : "addSlideLeftAnimation"} style={{display: "flex", flexDirection: "column", padding: "7px", gap: "7px"}}>
                              <li>
                                 {
                                     popup.type === PopupTypes.Create &&
                                     (
                                            <button className="categoriesEditBtn" onClick={() => setCategory("")}>
                                                <span style={{fontSize: "20px"}}>
                                                   ⮜
                                                </span>
                                               Edit Category
                                            </button>
                                     )
                                 }

                              </li>
                              <li style={{textAlign: "center", margin: "3px 0"}}>
                                 <div style={{display: "flex", flexDirection: "column"}}>
                                    <input placeholder="Type in name"
                                           className={`categoriesInput ${error !== "" ? "redBorder" : ""}`}
                                           value={name}
                                           onChange={(e) => setName(e.target.value)}
                                    />
                                    { error && (
                                        <span style={{color: "red"}}>{error}</span>
                                    )}
                                 </div>

                              </li>
                              <li style={{textAlign: "center", margin: "3px 0", overflow: "hidden"}}>
                                 <button className="categoriesSaveBtn" onClick={() => handleSave()}>
                                    Save
                                 </button>
                              </li>
                           </ul>
                       )}
          </div>
       </div>
   );
};

export default Popup;
