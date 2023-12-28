import { useState } from "react";
import './Modal.css';

export default function Modal () {
  const [offerAccepted, setOfferAccepted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  if (offerAccepted){
    return (
      <>
        Offer Accepted
      </>
    );
  }

  return(
    <>
      <button onClick={()=> setShowModal(true) }>Show Offer</button>
      { showModal && 
        <>
          <div 
            className="overlay"
            onClick={()=> setShowModal(false)}
          ></div>
          <div className="modal">
            <button onClick={()=> setShowModal(false)} >Close Button X</button>
            <p>Click button below to accept offer</p>
            <button onClick={()=> setOfferAccepted(true)}>Accept Offer</button>
          </div>
        </>
      }
    </>
  )
}
