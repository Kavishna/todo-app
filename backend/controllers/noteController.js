const { default: mongoose } = require("mongoose");
const Note = require("../Models/noteModel");

// Create a new note
const createNote = async (req, res) => {
  const { title, description, color } = req.body;

  try {
    const note = await Note.create({ title, description, color });
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all notes
const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific note
const getSingleNote = async (req, res) => {
  try {
    const id = req.params.id;
    if (mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json("invalid ID");
    }
    const note = await Note.findById(id);
    if (note) {
      res.status(200).json(note);
    } else {
      res.status(404).json({ message: "Note not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a note
const updateNote = async (req, res) => {
  try {
    // const id = ;

    // if (mongoose.Types.ObjectId.isValid(id)) {
    //   return res.status(404).json("invalid ID");
    // }

    const updatedNote = await Note.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body }
    );
    if (updatedNote) {
      res.status(200).json(updatedNote);
    } else {
      res.status(404).json({ message: "Note not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a note
const deleteNote = async (req, res) => {
  try {
    // const id = req.params.id;
    // if (mongoose.Types.ObjectId.isValid(id)) {
    //   return res.status(404).json("invalid ID");
    // }
    const deletedNote = await Note.findOneAndDelete({ _id: req.params.id });
    if (deletedNote) {
      res.status(200).json({ message: "Note deleted successfully" });
    } else {
      res.status(404).json({ message: "Note not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllNotes,
  createNote,
  getSingleNote,
  updateNote,
  deleteNote,
};
