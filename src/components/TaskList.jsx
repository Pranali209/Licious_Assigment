import TaskItem from './TaskItem'

export default function TaskList({ tasks, viewMode, onToggleStatus, onDelete, onEdit }) {
  if (!tasks.length) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8 text-blue-600"
          >
            <path d="M9 11l2 2 4-4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7" />
            <path d="M7 6V4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-slate-900">No tasks yet</h3>
        <p className="mt-2 text-sm text-slate-500">Create your first task to get started</p>
      </div>
    )
  }

  if (viewMode === 'list') {
    return (
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Priority</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Due</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                viewMode={viewMode}
                onToggleStatus={onToggleStatus}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div className="space-y-3 flex flex-wrap  items-center gap-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          viewMode={viewMode}
          onToggleStatus={onToggleStatus}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  )
}
