import "./App.css";

function App() {
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
