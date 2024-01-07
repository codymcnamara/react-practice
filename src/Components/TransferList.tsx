// https://www.algochurn.com/frontend/transfer-list

import { useState } from "react";
import '../css/TransferList.css'

interface Item {
  title: string,
  id: number, 
  checked: boolean
}

export const TransferList = () => {
  const [items, setItems] = useState(data);
  const [selected, setSelected] = useState([])


  return(
      <div className="transferList">
        <div>
          <h3>unchecked list</h3>
          {items.map((item)=>{
            if(!item.checked)
              return <Checkbox item={item} key={item.id}/>
          })}
        </div>
        <Controls/>
        <div>
          <h3>checked list</h3>
          {items.map((item)=>{
            if(item.checked)
              return <Checkbox item={item} key={item.id}/>
          })}
        </div>


      </div>
  )

}

const Controls = ()=> {

  return (
    <div className="controls">
      <a>{'<=='}</a>
      <a>{'==>'}</a>
    </div>
  )
}

const Checkbox = ({item}: {item: Item}) => {
  
  return(
    <div>
      <div>{item.title}</div>
    </div>
  )
}


export default TransferList



















// Transfer List
// Given a list of checkbox items, transfer checked items from one container to the other.


// User Stories
// The data for the list is given in the data.ts file.
// Create a TransfersList component that will handle the entire function.
// On clicking of the items on the Left Container, the box should highlight.
// On clicking of the items on the Right Container, the box should highlight.
// If any of the Arrow Buttons are clicked, the items should move into the respective boxes. For Example, If the First Item from the Left box is moved, it should move to the right box and should be removed from the left box -- finally should be unchecked.
// If an item from the left box is moved to left, nothing should happen. Similarly, if an item from the right box is move to right, nothing should happen.
// Use tailwindcss for styling.
// Notes
// Get icons from Heroicons.
// Styling is not important, functionality is.
// Abstract the logic into separate components. For Example, A Container, Checkbox and Controls component architecture will be helpful and clean.


const data = [
  { title: 'First', id: 0, checked: false },
  { title: 'Second', id: 1, checked: false },
  { title: 'Third', id: 2, checked: false },
  { title: 'Fourth', id: 3, checked: false },
];
