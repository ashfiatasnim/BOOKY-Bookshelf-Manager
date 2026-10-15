require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Book = require("./models/Book");

const app = express();
app.use(cors());
app.use(express.json());

const validId = (id) => mongoose.Types.ObjectId.isValid(id);
const clean = (v) => (typeof v === "string" ? v.trim() : "");

// GET /books - all books
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).json(books);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// POST /books - add a book
app.post("/books", async (req, res) => {
  try {
    const title = clean(req.body.title);
    const author = clean(req.body.author);
    if (!title || !author) {
      return res.status(400).json({ message: "Title and author are required" });
    }
    const book = await Book.create({ title, author });
    res.status(201).json(book);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /books/:id - mark as read
app.put("/books/:id", async (req, res) => {
  try {
    if (!validId(req.params.id)) {
      return res.status(400).json({ message: "Invalid book id" });
    }
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { status: "read" },
      { new: true }
    );
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.status(200).json(book);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /books/:id - delete a book
app.delete("/books/:id", async (req, res) => {
  try {
    if (!validId(req.params.id)) {
      return res.status(400).json({ message: "Invalid book id" });
    }
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.status(200).json({ message: "Book deleted" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;

// Start the server only after MongoDB is connected
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
