import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const api_base = "http://localhost:3000";

  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    GetTodos();
  }, []);

  const GetTodos = () => {
    fetch(api_base + "/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("Error: ", err));
  };

  console.log("todos", todos);

  return (
    <div className="App">
      <h1>Bonjour</h1>
      <h4>Tâches</h4>
      <div className="todos">
        <div className="todo">
          <div className="checkbox"></div>
          <div className="text">Faire le Ménage</div>
          <div className="delete-todo">x</div>
        </div>
        <div className="todo is-complete">
          <div className="checkbox"></div>
          <div className="text">Rdv médecin</div>
          <div className="delete-todo">x</div>
        </div>
      </div>
    </div>
  );
}

export default App;
