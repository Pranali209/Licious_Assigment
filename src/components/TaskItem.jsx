import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

const PRIORITY_STYLES = {
  High: 'text-red-600',
  Medium: 'text-amber-600',
  Low: 'text-emerald-600',
}

const PRIORITY_PILL = {
  High: 'bg-red-50 text-red-700 dark:bg-emerald-50 dark:text-red-200',
  Medium: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-200',
  Low: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200',
}



export default function TaskItem({ task, viewMode, onToggleStatus, onDelete, onEdit }) {
  const statusIsCompleted = task.status === 'Completed'
  const priorityClass = PRIORITY_STYLES[task.priority] || 'text-slate-600'
  const priorityPillClass = PRIORITY_PILL[task.priority] || 'bg-slate-100 text-slate-700 dark:bg-slate-700/40 dark:text-slate-200'
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({
    id: task.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }
  if (viewMode === 'list') {
    return (
      <tr className="hover:bg-slate-50 text-left">
        <td className="px-4 py-3 font-medium text-slate-800 text-left">{task.title}</td>
        <td className="px-4 py-3 text-slate-600 text-left ">{task.description || '—'}</td>
        <td className={`px-4 py-3 ${priorityClass} text-left`}>{task.priority}</td>
        <td className="px-4 py-3 text-left">{task.status}</td>
        <td className="px-4 py-3 text-left">{task.dueDate || '—'}</td>
        <td className="px-4 py-3 text-left">
          <div className="flex  gap-2">
            <button
              type="button"
              onClick={() => onEdit(task)}
              className=" cursor-pointer inline-flex items-center justify-center rounded-md bg-blue-300 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="14" width="14" viewBox="0 0 640 640">
                <path fill="rgb(13, 95, 239)" d="M100.4 417.2C104.5 402.6 112.2 389.3 123 378.5L304.2 197.3L338.1 163.4C354.7 180 389.4 214.7 442.1 267.4L476 301.3L442.1 335.2L260.9 516.4C250.2 527.1 236.8 534.9 222.2 539L94.4 574.6C86.1 576.9 77.1 574.6 71 568.4C64.9 562.2 62.6 553.3 64.9 545L100.4 417.2zM156 413.5C151.6 418.2 148.4 423.9 146.7 430.1L122.6 517L209.5 492.9C215.9 491.1 221.7 487.8 226.5 483.2L155.9 413.5zM510 267.4C493.4 250.8 458.7 216.1 406 163.4L372 129.5C398.5 103 413.4 88.1 416.9 84.6C430.4 71 448.8 63.4 468 63.4C487.2 63.4 505.6 71 519.1 84.6L554.8 120.3C568.4 133.9 576 152.3 576 171.4C576 190.5 568.4 209 554.8 222.5C551.3 226 536.4 240.9 509.9 267.4z" /></svg>
            </button>

            <button
              type="button"
              onClick={() => onDelete(task.id)}
              className=" cursor-pointer inline-flex items-center justify-center rounded-md bg-red-300 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-red-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="14" width="14" viewBox="0 0 640 640">
                <path fill="rgb(161, 10, 10)" d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z" /></svg>
            </button>
            <button
              type="button"
              onClick={() => onToggleStatus(task.id)}
              className={` cursor-pointer inline-flex items-center justify-center rounded-md px-3 py-2 text-xs font-semibold shadow-sm ${statusIsCompleted
                ? "bg-amber-50 text-amber-700 hover:bg-amber-100 dark:bg-amber-500/10 dark:text-amber-200 dark:hover:bg-amber-500/20"
                : "bg-emerald-600 text-white hover:bg-emerald-700"
                }`}
            >
              {statusIsCompleted ? (
                // SVG icon for Pending
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-4 h-4"
                  fill="currentColor"
                >
                  <path d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm0 96v128l96 56-16 28-112-64V144h32z" />
                </svg>
              ) : (
                "Mark Done"
              )}
            </button>
          </div>
        </td>
      </tr>
    )
  }

  return (
    <article
      ref={setNodeRef}
      style={style}

      className="group rounded-xl border border-slate-200 w-3xs bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-950">
      <div className="flex  flex-col gap-4">
        <div className="flex flex-col gap-2">
          <span
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing text-slate-400 hover:text-slate-600  "
          >
            ☰
          </span>
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">{task.title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{task.description || 'No description'}</p>
            </div>
            <span
              className={`inline-flex items-center justify-center rounded-full  px-3 py-1 text-xs font-semibold ${priorityPillClass}`}
            >
              {task.priority}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 border-t border-slate-200 pt-3 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-400">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-slate-50 border-2 border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                {statusIsCompleted ? 'Completed' : 'Pending'}
              </span>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">Due:</span>
              <span>{task.dueDate || '—'}</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => onEdit(task)}
                className=" cursor-pointer inline-flex items-center justify-center rounded-md bg-blue-300 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="14" width="14" viewBox="0 0 640 640">
                  <path fill="rgb(13, 95, 239)" d="M100.4 417.2C104.5 402.6 112.2 389.3 123 378.5L304.2 197.3L338.1 163.4C354.7 180 389.4 214.7 442.1 267.4L476 301.3L442.1 335.2L260.9 516.4C250.2 527.1 236.8 534.9 222.2 539L94.4 574.6C86.1 576.9 77.1 574.6 71 568.4C64.9 562.2 62.6 553.3 64.9 545L100.4 417.2zM156 413.5C151.6 418.2 148.4 423.9 146.7 430.1L122.6 517L209.5 492.9C215.9 491.1 221.7 487.8 226.5 483.2L155.9 413.5zM510 267.4C493.4 250.8 458.7 216.1 406 163.4L372 129.5C398.5 103 413.4 88.1 416.9 84.6C430.4 71 448.8 63.4 468 63.4C487.2 63.4 505.6 71 519.1 84.6L554.8 120.3C568.4 133.9 576 152.3 576 171.4C576 190.5 568.4 209 554.8 222.5C551.3 226 536.4 240.9 509.9 267.4z" /></svg>
              </button>

              <button
                type="button"
                onClick={() => onDelete(task.id)}
                className=" cursor-pointer inline-flex items-center justify-center rounded-md bg-red-300 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-red-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="14" width="14" viewBox="0 0 640 640">
                  <path fill="rgb(161, 10, 10)" d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z" /></svg>
              </button>
              <button
                type="button"
                onClick={() => onToggleStatus(task.id)}
                className={` cursor-pointer inline-flex items-center justify-center rounded-md px-3 py-2 text-xs font-semibold shadow-sm ${statusIsCompleted
                  ? 'bg-amber-50 text-amber-700 hover:bg-amber-100 dark:bg-amber-500/10 dark:text-amber-200 dark:hover:bg-amber-500/20'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
                  }`}
              >
                {statusIsCompleted ? 'Mark Pending' : 'Mark Done'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
