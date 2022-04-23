import { useEffect, useState } from "react"

const todoArray = [
  { id: "1", descripcion: 'Limpieza de la casa' },
  { id: "2", descripcion: 'Pagar la multa' },
  { id: "3", descripcion: 'Pagar la luz' }
]

const Todo = (props) => (
  <tr>
    <td>{props.item.descripcion}</td>
  </tr>
)

export default function TodoPage() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    async function getTodos() {
      const response = await fetch(`http://localhost:6535/todos/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const todos = await response.json();
      setTodos(todos["data"]);
    }

    getTodos();

    return;
  },[todos.length])

  function todoList() {
    return todos.map((todo) => {
      return (
        <Todo item={todo} key={todo.id}></Todo>
      );
    });
  }

  return (
    <div>
      <h3>Todo List</h3>
      <table>
        <thead>
          <tr>
            <th>Descripcion</th>
          </tr>
        </thead>
        <tbody>
          {todoList()}
        </tbody>  
      </table>
    </div>
  )
}