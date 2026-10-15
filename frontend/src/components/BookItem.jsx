export default function BookItem({ book, onRead, onDelete }) {
  const isRead = book.status === "read";

  return (
    <li className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className={`font-medium text-slate-800 ${isRead ? "text-slate-400 line-through" : ""}`}>
          {book.title}
        </p>
        <p className="text-sm text-slate-500">by {book.author}</p>
        {isRead && (
          <span className="mt-2 inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 border border-emerald-200">
            ✓ Read
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">
        {!isRead && (
          <button
            onClick={() => onRead(book.id)}
            className="rounded-lg border border-slate-200 bg-white px-3.5 py-1.5 text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-colors"
          >
            Mark read
          </button>
        )}
        <button
          onClick={() => onDelete(book.id)}
          className="rounded-lg border border-slate-200 bg-white px-3.5 py-1.5 text-sm font-medium text-slate-700 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 transition-colors"
        >
          Delete
        </button>
      </div>
    </li>
  );
}