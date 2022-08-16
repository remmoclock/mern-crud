function Popup({
  setPopupActive,
  selectedTodo,
  handleUpdate,
  value,
  title,
  textButton,
  updateTodo,
  addTodo,
  newTodo,
  setNewTodo,
}) {
  console.log("textButton", textButton);
  return (
    <div className="popup">
      <div className="closePopup" onClick={() => setPopupActive(false)}>
        ❌
      </div>
      <div className="content">
        <h3>{title}</h3>
        {textButton === "Sauvegarder" ? (
          <>
            <input
              type="text"
              className="add-todo-input"
              onChange={(e) => handleUpdate(e)}
              value={value}
            />
            <div
              className="button"
              onClick={() => updateTodo(selectedTodo._id)}
            >
              {textButton}
            </div>
          </>
        ) : (
          <>
            <input
              type="text"
              className="add-todo-input"
              onChange={(e) => setNewTodo(e.target.value)}
              value={newTodo}
            />
            <div className="button" onClick={() => addTodo()}>
              {textButton}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Popup;
