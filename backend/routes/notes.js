const express = require("express");
const router = express.Router();

let notes = [
  { id: 1, title: "Note 1", content: "Content 1" },
  { id: 2, title: "Note 2", content: "Content 2" },
];

// GET all notes
router.get("/", (req, res) => {
  res.json(notes);
});

// GET a specific note
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const note = notes.find((n) => n.id === id);

  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }

  res.json(note);
});

// POST a new note
router.post("/", (req, res) => {
  const { title, content } = req.body;
  const newNote = { id: notes.length + 1, title, content };
  notes.push(newNote);
  res.status(201).json(newNote);
});

// PUT (update) a note
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content } = req.body;
  const index = notes.findIndex((n) => n.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Note not found" });
  }

  notes[index] = { id, title, content };
  res.json(notes[index]);
});

// DELETE a note
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = notes.findIndex((n) => n.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Note not found" });
  }

  const deletedNote = notes.splice(index, 1);
  res.json({ message: "Note deleted", deletedNote: deletedNote[0] });
});

module.exports = router;
