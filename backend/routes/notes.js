const express = require("express");
const router = express.Router();
const {
  createNote,
  getAllNotes,
  getSingleNote,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");

let notes = [
  { id: 1, title: "Note 1", content: "Content 1" },
  { id: 2, title: "Note 2", content: "Content 2" },
];

// GET all notes
router.get("/", getAllNotes);

// GET a specific note
router.get("/:id", getSingleNote);

// POST a new note
router.post("/", createNote);

// PUT (update) a note
router.patch("/:id", updateNote);

// DELETE a note
router.delete("/:id", deleteNote);

module.exports = router;
