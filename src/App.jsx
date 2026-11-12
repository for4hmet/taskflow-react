import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  // LocalStorage'dan kayıtlı görevleri yükleme
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem("taskflow-tasks");
      const parsedTasks = savedTasks ? JSON.parse(savedTasks) : [];

      return Array.isArray(parsedTasks) ? parsedTasks : [];
    } catch {
      return [];
    }
  });

  const [taskTitle, setTaskTitle] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Görevler değiştiğinde LocalStorage'a kaydetme
  useEffect(() => {
    localStorage.setItem("taskflow-tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Görev ekleme ve güncelleme
  function handleSubmit(e) {
    e.preventDefault();

    if (taskTitle.trim() === "") return;

    if (editingId !== null) {
      setTasks(
        tasks.map((task) =>
          task.id === editingId ? { ...task, title: taskTitle.trim() } : task,
        ),
      );
      setEditingId(null);
    } else {
      const newTask = {
        id: Date.now(),
        title: taskTitle.trim(),
      };

      setTasks([...tasks, newTask]);
    }

    setTaskTitle("");
  }

  // Düzenlenecek görevi seçme
  function editTask(task) {
    setEditingId(task.id);
    setTaskTitle(task.title);
  }

  // iptal etme
  function cancelEditing() {
    setEditingId(null);
    setTaskTitle("");
  }

  // Görev silme
  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));

    if (editingId === id) {
      setEditingId(null);
      setTaskTitle("");
    }
  }

  return (
    <div>
      <h1>TaskFlow</h1>
      <p>Görev Yönetim Uygulaması</p>

      <TaskForm
        taskTitle={taskTitle}
        setTaskTitle={setTaskTitle}
        editingId={editingId}
        handleSubmit={handleSubmit}
        onCancel={cancelEditing}
      />

      <h2>Görevlerim</h2>

      <TaskList tasks={tasks} onEdit={editTask} onDelete={deleteTask} />
    </div>
  );
}

export default App;
