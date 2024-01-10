// https://www.algochurn.com/frontend/transfer-list

import { useState } from "react";
import '../css/TransferList.css'

interface Item {
  title: string,
  id: number, 
  checked: boolean
}

export const TransferList = () => {
  const [items, setItems] = useState<Item[]>(data);
  const [selected, setSelected] = useState<Item[]>([])

  const updateSelected = (item: Item) => {
    // remove from selected
    if(selected.includes(item)){
      setSelected(selected.filter((selectedItem)=> {
        return selectedItem !== item 
      }))
    // add to selected
    } else {
      setSelected([...selected, item]);
    }
  }

  const handleArrowClick = (right: boolean)=> {
    const checkedVal = right;
    const newItems = items.map((oldItem)=>{
      if (selected.includes(oldItem)){
        return {
          ...oldItem,
          checked: checkedVal
        }
      } else {
        return oldItem;
      }
    })
    setItems(newItems);
    setSelected([]);
  }

  return(
      <div className="transferList">
        <div>
          <h3>unchecked list</h3>
          {items.map((item)=>{
            if(!item.checked)
              return <Checkbox 
                item={item} 
                key={item.id} 
                handleClick={updateSelected} 
                isSelected={selected.includes(item)}    
              />
          })}
        </div>
        <Controls handleArrowClick={handleArrowClick}/>
        <div>
          <h3>checked list</h3>
          {items.map((item)=>{
            if(item.checked)
              return <Checkbox 
                item={item} 
                key={item.id} 
                handleClick={updateSelected} 
                isSelected={selected.includes(item)}
              />
          })}
        </div>
      </div>
  )

}

const Controls = ({handleArrowClick}: { handleArrowClick: (right: boolean)=> void }) => {

  return (
    <div className="controls">
      <a onClick={()=> handleArrowClick(false)}>{'<=='}</a>
      <a onClick={()=> handleArrowClick(true)}>{'==>'}</a>
    </div>
  )
}

const Checkbox = ({item, handleClick, isSelected}: {item: Item, handleClick: (item: Item)=> void, isSelected: boolean} ) => {
  
  return(
    <div onClick={()=>handleClick(item)} className={'checkbox' + (isSelected ? ' selected' : '')}>
      <div>{item.title}</div>
    </div>
  )
}


export default TransferList


const data = [
  { title: 'First', id: 0, checked: false },
  { title: 'Second', id: 1, checked: false },
  { title: 'Third', id: 2, checked: false },
  { title: 'Fourth', id: 3, checked: false },
];


















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


// Solution:
// import React, { useState } from 'react';
// import { data } from '../TransferList/data';

// const LIST_MAPPER = {
//   RIGHT: 'RIGHT',
//   LEFT: 'LEFT',
// };

// const DIRECTION = {
//   RIGHT: 'RIGHT',
//   LEFT: 'LEFT',
// };

// export const TransferList = () => {
//   const [items, setItems] = useState(data);

//   const [leftItems, setLeftItems] = useState(items);
//   const [rightItems, setRightItems] = useState([]);

//   const onChange = (id, checked, direction) => {
//     let iteratableItems =
//       direction === LIST_MAPPER.LEFT ? leftItems : rightItems;

//     let newItems = iteratableItems.map((item) => {
//       if (item.id === id) {
//         return {
//           ...item,
//           checked: checked,
//         };
//       } else {
//         return item;
//       }
//     });
//     if (direction === LIST_MAPPER.LEFT) {
//       setLeftItems(newItems);
//     } else {
//       setRightItems(newItems);
//     }
//   };

//   const onClick = (direction) => {
//     if (direction === DIRECTION.RIGHT) {
//       // take checked items from leftArray and move it to rightArray.
//       moveToRight();
//     } else {
//       // take checked items from rightArray and move it to leftArray.
//       moveToLeft();
//     }
//   };

//   const moveToRight = () => {
//     // filter checked items
//     let filtered = leftItems.filter((item) => item.checked);
//     let remaining = leftItems.filter((item) => !item.checked);
//     // mark them not checked
//     let unchecked = filtered.map((item) => {
//       return {
//         ...item,
//         checked: false,
//       };
//     });

//     // push to right array
//     let final = [...rightItems, ...unchecked];
//     setRightItems(final);
//     setLeftItems(remaining);
//   };

//   const moveToLeft = () => {
//     // filter checked items
//     let filtered = rightItems.filter((item) => item.checked);
//     let remaining = rightItems.filter((item) => !item.checked);
//     // mark them not checked
//     let unchecked = filtered.map((item) => {
//       return {
//         ...item,
//         checked: false,
//       };
//     });

//     // push to left array
//     let final = [...leftItems, ...unchecked];
//     setLeftItems(final);
//     setRightItems(remaining);
//   };

//   return (
//     <div className="w-3/4 h-96 bg-gray-50 mt-10 rounded-md flex space-x-4 p-4">
//       <Container
//         items={leftItems}
//         onChange={(id, checked) => onChange(id, checked, LIST_MAPPER.LEFT)}
//       />
//       <Controls onClick={onClick} />
//       <Container
//         items={rightItems}
//         onChange={(id, checked) => onChange(id, checked, LIST_MAPPER.RIGHT)}
//       />
//     </div>
//   );
// };

// const Container = ({ items, onChange }) => {
//   return (
//     <div className="h-full flex-shrink-0 w-1/3 border border-neutral-200 p-4 rounded-lg bg-white shadow-xl">
//       {items.map((item, idx) => (
//         <Checkbox
//           {...item}
//           onChange={(checked) => onChange(item.id, checked)}
//         />
//       ))}
//     </div>
//   );
// };

// const Checkbox = ({ title, checked, onChange }) => {
//   return (
//     <div className="block mb-6">
//       <label>
//         <span
//           className={`cursor-pointer hover:bg-gray-200 select-none border p-2 rounded-lg w-full block text-center ${
//             checked ? 'bg-black text-white border-black hover:bg-gray-600' : ''
//           }`}
//         >
//           {title}
//         </span>
//         <input
//           checked={checked}
//           onChange={(e) => onChange(e.target.checked)}
//           type="checkbox"
//           hidden
//         />
//       </label>
//     </div>
//   );
// };
// const Controls = ({ onClick }) => {
//   return (
//     <div className="w-full flex flex-col items-center justify-center space-y-4">
//       <RightButton onClick={() => onClick(DIRECTION.RIGHT)} />
//       <LeftButton onClick={() => onClick(DIRECTION.LEFT)} />
//     </div>
//   );
// };

// const LeftButton = (props) => {
//   return (
//     <button
//       {...props}
//       className="flex items-center hover:bg-gray-200 justify-center h-7 w-7 rounded-full border border-neutral-500"
//     >
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         fill="none"
//         viewBox="0 0 24 24"
//         strokeWidth="1.5"
//         stroke="currentColor"
//         className="w-4 h-4"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
//         />
//       </svg>
//     </button>
//   );
// };

// const RightButton = (props) => {
//   return (
//     <button
//       {...props}
//       className="flex items-center hover:bg-gray-200 justify-center h-7 w-7 rounded-full border border-neutral-500"
//     >
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         fill="none"
//         viewBox="0 0 24 24"
//         strokeWidth="1.5"
//         stroke="currentColor"
//         className="w-4 h-4"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
//         />
//       </svg>
//     </button>
//   );
// };
