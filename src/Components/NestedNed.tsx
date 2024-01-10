import { useContext, createContext } from "react";

const messageContext = createContext('');

export default function Ned () {

  const message = 'Ned is the best';

  return (
    <messageContext.Provider value={message}>
      <Ned1/>
    </messageContext.Provider>
  )
}

function Ned1 () {

  return (
    <Ned2/>
  )
}
function Ned2 () {

  return (
    <Ned3/>
  )
}
function Ned3 () {

  return (
    <Ned4/>
  )
}
function Ned4 () {
  const message = useContext(messageContext)

  return (
    <>{message}</>
  )
}