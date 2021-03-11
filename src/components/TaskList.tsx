import { useState, KeyboardEvent } from "react";
import { v4 as uuid } from "uuid";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";

interface Task {
  id: string;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  function handleCreateNewTask() {
    if (newTaskTitle === "") return;

    const createNewTask = [
      ...tasks,
      {
        id: uuid(),
        title: newTaskTitle,
        isComplete: false,
      },
    ];

    setTasks(createNewTask);

    setNewTaskTitle("");
  }

  function handleToggleTaskCompletion(id: string) {
    const toggleTasks = tasks.map((task) => {
      if (task.id === id) task.isComplete = !task.isComplete;

      return task;
    });

    setTasks(toggleTasks);
  }

  function handleRemoveTask(id: string) {
    const toggleTasks = tasks.filter((task) => task.id !== id);

    setTasks(toggleTasks);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    const { key } = event;

    console.log(key);

    if (key === "Enter") handleCreateNewTask();
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
            onKeyDown={handleKeyDown}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? "completed" : ""}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
