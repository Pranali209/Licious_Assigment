import { useEffect, useState } from 'react'

export default function TaskForm({ onAddTask, onUpdateTask, onClose, taskToEdit }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'High',
    dueDate: '',
    status: 'Pending',
  })

  useEffect(() => {
    if (taskToEdit) {
      setForm({
        title: taskToEdit.title,
        description: taskToEdit.description,
        priority: taskToEdit.priority,
        dueDate: taskToEdit.dueDate,
        status: taskToEdit.status,
      })
    } else {
      setForm({
        title: '',
        description: '',
        priority: 'High',
        dueDate: '',
        status: 'Pending',
      })
    }
  }, [taskToEdit])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!form.title.trim()) {
      return
    }

    const taskPayload = {
      ...form,
      id: taskToEdit?.id || (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}`),
    }

    if (taskToEdit) {
      onUpdateTask?.(taskPayload)
    } else {
      onAddTask?.(taskPayload)
    }

    setForm({
      title: '',
      description: '',
      priority: 'High',
      dueDate: '',
      status: 'Pending',
    })
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl text-left"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">{taskToEdit ? 'Edit Task' : 'Create New Task'}</h2>
           
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="mt-5 space-y-4">
          <div className="space-y-1">
            <label className="block text-left text-sm font-medium">Task Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter task title"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="h-24 w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Task details"
            />
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="block text-left text-sm font-medium">Priority</label>
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-left text-sm font-medium">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-1 w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {taskToEdit ? 'Save Changes' : 'Add Task'}
          </button>
        </div>
      </form>
    </div>
  )
}
