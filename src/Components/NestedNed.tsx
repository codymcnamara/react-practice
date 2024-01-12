import { useContext, createContext, useState, useEffect } from "react";

const messageContext = createContext('');

export default function Ned () {
  const [todos, setTodos] = useState<object[]>([]);
  const [todoIndex, setTodoIndex] = useState(1)

  const message = 'Ned is the best';

  const getTodo = async (id: number, ignore: boolean) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/' + todoIndex);
    const todo = await response.json();
    console.log(todo);
    // if(!ignore){
      console.log('ignore false');
      setTodos([...todos, todo]);
      setTodoIndex(todoIndex + 1)
    // }
  }

  useEffect(()=>{
    let ignore = false;

    getTodo(1, ignore);

    return () => {
      ignore = true;
    };
  }, [])


  return (
    <messageContext.Provider value={message}>
      {todos.map((todo)=> <div key={todo.id}>{todo.title}</div>)}
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