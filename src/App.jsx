import { useState, useEffect } from "react";

// Komponenta za pojedinačni zadatak
function TaskItem({ task, onDelete }) {
  return (
    <li>
      {task.text}
      <button onClick={() => onDelete(task.id)}>❌</button>
    </li>
  );
}

// Forma za dodavanje zadataka
function TaskForm({ onAdd }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") return; // Validacija
    onAdd(input);
    setInput(""); // Reset polja
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-3">
          <form onSubmit={handleSubmit}>
            <input className="form-control mb-4"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Unesi zadatak..."
            />
            <button className="btn btn-primary" type="submit">Dodaj</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [isVisible, setIsVisible] = useState(true);

  // useEffect primer – učitavanje default zadatka na mount
  useEffect(() => {
    setTasks([{ id: 1, text: "Nauči React osnove" }]);
  }, []);

  // Dodavanje zadatka
  const addTask = (text) => {
    setTasks([...tasks, { id: Date.now(), text }]);
  };

  // Brisanje zadatka
  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-3">
            <h1 className="text-center">📋 Mini React Todo</h1>
            <TaskForm onAdd={addTask} />

            <button onClick={() => setIsVisible(!isVisible)}>
              {isVisible ? "Sakrij listu" : "Prikaži listu"}
            </button>

            {/* Conditional rendering */}
            {isVisible ? (
              <ul>
                {tasks.length > 0 ? (
                  tasks.map((task) => (
                    <TaskItem key={task.id} task={task} onDelete={deleteTask} />
                  ))
                ) : (
                  <p>Nema zadataka</p>
                )}
              </ul>
            ) : (
              <p>Lista je sakrivena</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
