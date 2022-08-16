import { useEffect, useState } from "react";
import "./App.css";
import Popup from "./Components/Popup";

function App() {
  const api_base = "http://localhost:3000";

  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [popupActive2, setPopupActive2] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const [selectedTodo, setSelectedTodo] = useState();
  const [value, setValue] = useState();

  const handleUpdate = (e) => {
    setValue(e.target.value);
  };

  const GetTodos = () => {
    fetch(api_base + "/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("Error: ", err));
  };

  useEffect(() => {
    GetTodos();
  }, []);

  const completeTodo = async (id) => {
    const data = await fetch(api_base + "/todo/complete/" + id).then((res) =>
      res.json()
    );

    setTodos((todos) =>
      todos.map((todo) => {
        if (todo._id === data._id) {
          todo.complete = data.complete;
        }

        return todo;
      })
    );
  };

  const deleteTodo = async (id) => {
    const data = await fetch(api_base + "/todo/delete/" + id, {
      method: "DELETE",
    }).then((res) => res.json());

    setTodos(
      (todos) =>
        todos.length > 0 &&
        todos?.filter((todo) => todo?._id !== data?.result._id)
    );
  };

  // const updateTodo = (id) => {
  //   fetch(api_base + "/todo/update/" + id, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: {
  //       text: selectedTodo.text,
  //     },
  //   }).then((res) => {
  //     console.log("res", res.json());
  //   });

  const updateTodo = async (id) => {
    let rep = await fetch(api_base + "/todo/update/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: value,
      }),
    });
    let response = await rep.json();
    console.log("rep", response);

    const allTasksTodos = [...todos];
    const allTasks = allTasksTodos.map((todo) => {
      return todo._id === response._id
        ? { ...todo, text: response.text }
        : todo;
    });

    setTodos(allTasks);

    setPopupActive(false);
  };

  const addTodo = async () => {
    const data = await fetch(api_base + "/todo/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: newTodo,
      }),
    }).then((res) => res.json());

    setTodos([...todos, data]);

    setPopupActive2(false);
    setNewTodo("");
  };

  const tasksNotCompleted = todos.filter((todo) => {
    return !todo.complete;
  });

  return (
    <div className="App">
      <h1>Bonjour</h1>
      <h4>
        {tasksNotCompleted.length}{" "}
        {tasksNotCompleted.length > 1
          ? "Tâches restantes"
          : tasksNotCompleted.length > 0
          ? "Tâche restante"
          : "Tâche"}
      </h4>

      <div className="todos">
        {todos &&
          todos.map((todo) => {
            return (
              <div
                className={`todo ${todo.complete && "is-complete"}`}
                key={todo._id}
              >
                <div
                  className={`checkbox ${todo.complete && "is-complete"}`}
                  onClick={() => completeTodo(todo._id)}
                ></div>
                <div className="text">{todo.text}</div>
                <div
                  className="delete-todo"
                  onClick={() => deleteTodo(todo._id)}
                >
                  x
                </div>
                <div
                  className="update-todo"
                  onClick={() => {
                    setSelectedTodo(todo);
                    setPopupActive(true);
                    setValue(todo.text);
                  }}
                >
                  ⁝
                </div>
              </div>
            );
          })}
      </div>
      <div className="addPopup" onClick={() => setPopupActive2(true)}>
        +
      </div>

      {popupActive && (
        <Popup
          setPopupActive={setPopupActive}
          selectedTodo={selectedTodo}
          updateTodo={updateTodo}
          handleUpdate={handleUpdate}
          value={value}
          title="Modifier une tâche"
          textButton="Sauvegarder"
        />
      )}
      {popupActive2 && (
        <Popup
          setPopupActive={setPopupActive2}
          addTodo={addTodo}
          value={value}
          title="Ajouter une tâche"
          textButton="Ajouter"
          setNewTodo={setNewTodo}
          newTodo={newTodo}
        />
      )}
    </div>
  );
}

export default App;
