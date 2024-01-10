import {useState, createContext, useContext } from 'react'

const userContext = createContext('');

export default function NestedNancy () {
  const [user, setUser] = useState("Jesse dfdfs");

  return (
    <>
      <userContext.Provider value={user}>
        <h1>{`Hello ${user}!`}</h1>
        <Component2 />
      </userContext.Provider>
    </>
  );
}

function Component2() {
  return (
    <>
      <h2>Component 2</h2>
      <Component3 />
    </>
  );
}

function Component3() {
  return (
    <>
      <h3>Component 3</h3>
      <Component4 />
    </>
  );
}

function Component4() {
  return (
    <>
      <h4>Component 4</h4>
      <Component5 />
    </>
  );
}

function Component5() {
  const userName = useContext(userContext);
  return (
    <>
      <h5>Component 5</h5>
      <h6>{`Hello ${userName} again!`}</h6>
    </>
  );
}