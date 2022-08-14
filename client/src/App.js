import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const api_base = "http://localhost:3000";

  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  const GetTodos = () => {
    fetch(api_base + "/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("Error: ", err));
  };

  useEffect(() => {
    GetTodos();
  }, []);

  console.log("todos", todos);

  return (
    <div className="App">
      <h1>Bonjour</h1>
      <h4>
        {todos.length} {todos.length > 1 ? "Tâches" : "Tâche"}
      </h4>

      <div className="todos">
        {todos &&
          todos.map((todo) => {
            return (
              <div
                className={`todo ${todo.complete && "is-complete"}`}
                key={todo._id}
              >
                <div className="checkbox"></div>
                <div className="text">{todo.text}</div>
                <div className="delete-todo">x</div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
