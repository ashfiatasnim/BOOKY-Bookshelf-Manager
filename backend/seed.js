// Run with: npm run seed
require("dotenv").config();
const mongoose = require("mongoose");
const Book = require("./models/Book");

const books = [
  { title: "Arabian Nights", author: "J J Thomson", status: "unread" },
  { title: "To Kill a Mockingbird", author: "Harper Lee", status: "read" },
  { title: "1984", author: "George Orwell", status: "read" },
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", status: "unread" },
  { title: "Pride and Prejudice", author: "Jane Austen", status: "read" },
  { title: "The Hobbit", author: "J.R.R. Tolkien", status: "unread" },
  { title: "Brave New World", author: "Aldous Huxley", status: "unread" },
  { title: "The Alchemist", author: "Paulo Coelho", status: "read" },
  { title: "Crime and Punishment", author: "Fyodor Dostoevsky", status: "unread" },
  { title: "Moby Dick", author: "Herman Melville", status: "unread" },
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Book.deleteMany({});
    await Book.insertMany(books);
    console.log(`Seeded ${books.length} books`);
  } catch (err) {
    console.error("Seed failed:", err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
})();
