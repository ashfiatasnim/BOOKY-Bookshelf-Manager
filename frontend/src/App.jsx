import { useState, useEffect } from "react";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function App() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");

  // Load books on start
  useEffect(() => {
    fetch(`${API}/books`)
      .then((res) => res.json())
      .then(setBooks)
      .catch(() => setError("Could not load books"));
  }, []);

  const addBook = async (title, author) => {
    setError("");
    const res = await fetch(`${API}/books`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, author }),
    });
    const data = await res.json();
    if (!res.ok) return setError(data.message);
    setBooks((prev) => [data, ...prev]);
  };

  const markRead = async (id) => {
    const res = await fetch(`${API}/books/${id}`, { method: "PUT" });
    const data = await res.json();
    if (!res.ok) return setError(data.message);
    setBooks((prev) => prev.map((b) => (b.id === id ? data : b)));
  };

  const deleteBook = async (id) => {
    const res = await fetch(`${API}/books/${id}`, { method: "DELETE" });
    if (!res.ok) return setError("Could not delete book");
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="mx-auto max-w-2xl rounded-xl bg-white p-4 shadow sm:p-6">
        <h1 className="mb-4 text-2xl font-bold text-gray-800 sm:text-3xl">
          📚 BOOKY
        </h1>
        <p className="mb-4 text-gray-600">
  Welcome to BOOKY — Your Personal Bookshelf
</p>
        <BookForm onAdd={addBook} />
        {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
        <BookList books={books} onRead={markRead} onDelete={deleteBook} />
      </div>
    </div>
  );
}
