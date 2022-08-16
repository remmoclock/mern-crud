function Popup({
  setPopupActive,
  selectedTodo,
  handleUpdate,
  value,
  title,
  textButton,
  saveTodo,
  updateTodo,
}) {
  console.log("textButton", textButton);
  return (
    <div className="popup">
      <div className="closePopup" onClick={() => setPopupActive(false)}>
        X
      </div>
      <div className="content">
        <h3>{title}</h3>
        <input
          type="text"
          className="add-todo-input"
          onChange={(e) => handleUpdate(e)}
          value={value}
        />
        <div className="button" onClick={() => updateTodo(selectedTodo._id)}>
          Sauvegarder
        </div>
        {/* <div className="button" onClick={() => addTodo()}>
          Ajouter
        </div> */}
      </div>
    </div>
  );
}

export default Popup;
