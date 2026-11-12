
function TaskItem({ task, onEdit, onDelete }) {
  return (
    <li>
      {task.title}

      <button
        type="button"
        onClick={() => onEdit(task)}
      >
        Düzenle
      </button>

      <button
        type="button"
        onClick={() => onDelete(task.id)}
      >
        Sil
      </button>
    </li>
  )
}

export default TaskItem
