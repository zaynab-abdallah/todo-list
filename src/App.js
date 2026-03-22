import { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const inputRef = useRef();

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    const text = inputRef.current.value;
    if (!text) return;
    const newItem = { completed: false, text: text };
    setTodos([...todos, newItem]);
    inputRef.current.value = "";
  };

  const handleItemDone = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const handleItemDelete = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <h1>To Do List</h1>
      <div className="to_do_container">
        <ul>
          {todos.map(({ text, completed }, index) => {
            return (
              <div className="item" key={index}>
                <li
                  className={completed ? "done" : ""}
                  onClick={() => handleItemDone(index)}
                >
                  {text}
                </li>
                <span onClick={() => handleItemDelete(index)}>❌</span>
              </div>
            );
          })}
        </ul>
        <input ref={inputRef} placeholder="Enter item..." />
        <button onClick={handleAddTodo}>Add</button>
      </div>
    </div>
  );
}

export default App;
