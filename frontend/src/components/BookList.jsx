import BookItem from "./BookItem";

export default function BookList({ books, onRead, onDelete }) {
  if (books.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center">
        <p className="text-slate-500">No books in your collection yet. Add one above!</p>
      </div>
    );
  }
  
  return (
    <ul className="space-y-3">
      {books.map((book) => (
        <BookItem key={book.id} book={book} onRead={onRead} onDelete={onDelete} />
      ))}
    </ul>
  );
}