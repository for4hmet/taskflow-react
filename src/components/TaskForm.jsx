
function TaskForm({
  taskTitle,
  setTaskTitle,
  editingId,
  handleSubmit,
  onCancel
}) {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Yeni görev giriniz"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
      />

      <button type="submit">
        {editingId !== null ? 'Güncelle' : 'Görev Ekle'}
      </button>

      {editingId !== null && (
        <button
          type="button"
          className="cancel-button"
          onClick={onCancel}
        >
          İptal
        </button>
      )}
    </form>
  )
}

export default TaskForm
