import { useEffect, useMemo, useState } from 'react'
import './App.css'
import TaskFilters from './components/TaskFilters'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import TaskStats from './components/TaskStats'
import { PRIORITY_FILTERS, STATUS_FILTERS, VIEW_MODES } from './constants'

function App() {
  const [tasks, setTasks] = useState(() => {
    if (typeof window === 'undefined') return []
    try {
      const raw = window.localStorage.getItem('tasks')
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })
  const [isFormOpen, setFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [viewMode, setViewMode] = useState(VIEW_MODES.CARD)
  const [isDark, setIsDark] = useState(false)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState(STATUS_FILTERS.ALL)
  const [priorityFilter, setPriorityFilter] = useState(PRIORITY_FILTERS.ALL)

  const stats = useMemo(() => {
    const total = tasks.length
    const pending = tasks.filter((task) => task.status === 'Pending').length
    const completed = tasks.filter((task) => task.status === 'Completed').length
    return { total, pending, completed }
  }, [tasks])

  useEffect(() => {
    try {
      window.localStorage.setItem('tasks', JSON.stringify(tasks))
    } catch {
      // ignore write errors
    }
  }, [tasks])

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        if (statusFilter !== STATUS_FILTERS.ALL) {
          return task.status === statusFilter
        }
        return true
      })
      .filter((task) => {
        if (priorityFilter !== PRIORITY_FILTERS.ALL) {
          return task.priority === priorityFilter
        }
        return true
      })
      .filter((task) => {
        if (!search.trim()) return true
        const normalized = search.trim().toLowerCase()
        return (
          task.title.toLowerCase().includes(normalized) ||
          task.description.toLowerCase().includes(normalized)
        )
      })
  }, [tasks, statusFilter, priorityFilter, search])

  const handleAddTask = (task) => {
    setTasks((prev) => [task, ...prev])
    setFormOpen(false)
  }

  const handleStartEdit = (task) => {
    setEditingTask(task)
    setFormOpen(true)
  }

  const handleUpdateTask = (updatedTask) => {
    setTasks((prev) => prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)))
    setEditingTask(null)
    setFormOpen(false)
  }

  const handleDelete = (id) => {
    alert('You are about to delete this task. This action cannot be undone. Do you want to proceed?')
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const handleToggleStatus = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === 'Pending' ? 'Completed' : 'Pending',
            }
          : task
      )
    )
  }

  const handleCloseForm = () => {
    setFormOpen(false)
    setEditingTask(null)
  }

  return (
    <div className={`min-h-screen  p-6 ${isDark ? 'dark bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-blue-600 to-indigo-300 text-white shadow">
              <span className="text-lg font-semibold">📋</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">Task Manager</h1>
              <p className="text-sm text-slate-600">Track your work, filter tasks, and switch views.</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className={`flex overflow-hidden rounded-full text-xs shadow-sm ${
            isDark
              ? 'border border-slate-700 bg-slate-800'
              : 'border border-slate-200 bg-white'
          }`}>
            <button
              type="button"
              onClick={() => setViewMode(VIEW_MODES.LIST)}
              className={`px-3 py-2 ${
                viewMode === VIEW_MODES.LIST
                  ? isDark
                    ? 'bg-white text-slate-900'
                    : 'bg-slate-900 text-white'
                  : isDark
                  ? 'text-slate-200 hover:bg-slate-700'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              List View
            </button>
            <button
              type="button"
              onClick={() => setViewMode(VIEW_MODES.CARD)}
              className={`px-3 py-2 ${
                viewMode === VIEW_MODES.CARD
                  ? isDark
                    ? 'bg-white text-slate-900'
                    : 'bg-slate-900 text-white'
                  : isDark
                  ? 'text-slate-200 hover:bg-slate-700'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Card View
            </button>
          </div>

            <button
              onClick={() => setIsDark((prev) => !prev)}
              className={`inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDark
                  ? '!bg-white border-slate-700 !text-slate-900 hover:bg-slate-100'
                  : 'border-slate-200 bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              {isDark ? 'Light ☀️' : 'Dark 🌑'}
            </button>

            <button
              onClick={() => {
                setEditingTask(null)
                setFormOpen(true)
              }}
              className="inline-flex items-center justify-center gap-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="14" width="14" viewBox="0 0 640 640">
              <path fill="rgb(243, 246, 250)" d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/></svg>
              Create Task
            </button>
          </div>
        </header>

        <TaskStats stats={stats} />

        <TaskFilters
          search={search}
          setSearch={setSearch}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
        />

        <section className="space-y-4">
          <TaskList
            tasks={filteredTasks}
            viewMode={viewMode}
            onToggleStatus={handleToggleStatus}
            onDelete={handleDelete}
            onEdit={handleStartEdit}
            setTasks={setTasks}
          />
        </section>
      </div>

      {isFormOpen && (
        <TaskForm
          onAddTask={handleAddTask}
          onUpdateTask={handleUpdateTask}
          onClose={handleCloseForm}
          taskToEdit={editingTask}
        />
      )}
    </div>
  )
}

export default App
