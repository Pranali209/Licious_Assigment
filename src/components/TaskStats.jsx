export default function TaskStats({ stats }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <div className="rounded-xl bg-linear-to-r from-blue-600 to-indigo-400 p-5 shadow-sm text-white">
        <p className="text-sm font-medium opacity-90">Total Tasks</p>
        <p className="mt-2 text-2xl font-semibold">{stats.total}</p>
      </div>
      <div className="rounded-xl bg-linear-to-r from-orange-500 to-amber-400 p-5 shadow-sm text-white">
        <p className="text-sm font-medium opacity-90">Pending Tasks</p>
        <p className="mt-2 text-2xl font-semibold">{stats.pending}</p>
      </div>
      <div className="rounded-xl bg-linear-to-r from-emerald-400 to-emerald-600 p-5 shadow-sm text-white">
        <p className="text-sm font-medium opacity-90">Completed Tasks</p>
        <p className="mt-2 text-2xl font-semibold">{stats.completed}</p>
      </div>
    </div>
  )
}
