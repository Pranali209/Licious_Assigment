import { PRIORITY_FILTERS, STATUS_FILTERS } from '../constants'

export default function TaskFilters({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="flex items-center gap-2 rounded-xl bg-white p-4 shadow-sm">
        <span className="text-slate-400">🔍</span>
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          placeholder="Search tasks..."
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2 rounded-xl bg-white p-2 shadow-sm">

          {Object.values(STATUS_FILTERS).map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                statusFilter === status
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-white p-2 shadow-sm">
          <span className="text-xs font-medium text-slate-500">Priority:</span>
          <select
            value={priorityFilter}
            onChange={(event) => setPriorityFilter(event.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs focus:ring-2 focus:ring-blue-500"
          >
            {Object.values(PRIORITY_FILTERS).map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </div>

        
      </div>
    </div>
  )
}
