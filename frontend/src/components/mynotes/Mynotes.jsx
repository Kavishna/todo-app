import { useState, useEffect } from "react";
import addIcon from "../../assets/add-note.svg";
import "./Mynotes.css";
import Newnote from "../newnote/Newnote";
import { useNotesContext } from "../../hooks/useNotesContext";

const Mynotes = () => {
  // const [notes, setNotes] = useState(null);
  const [toggleNoteModel, setToggleNoteModel] = useState(false);
  const [updateNote, setUpdateNoteModel] = useState(false);
  const [updateData, setUpdateData] = useState(null);

  const { notes, dispatch } = useNotesContext();

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await fetch("/api/notes");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_NOTES", payload: json });
      }
      console.log(notes);
    };

    fetchNotes();
  }, []);

  const openNote = () => {
    setToggleNoteModel(true);
  };

  const closeNote = () => {
    setToggleNoteModel(false);
    setUpdateNoteModel(false);
    setUpdateData(null);
  };

  const handleUpdateNote = (data) => {
    setUpdateNoteModel(true);
    setUpdateData({
      id: data._id,
      title: data.title,
      description: data.description,
      color: data.color,
    });
  };

  return (
    <>
      {(toggleNoteModel || updateNote) && (
        <Newnote
          closeNote={closeNote}
          noteState={updateNote ? "Update Note" : "Add a New Note"}
          updateData={updateData}
        />
      )}
      <div className="outer-container">
        <div className="notes-container">
          <h2>
            Welcome <span>Kavishna</span>
          </h2>
          {notes &&
            notes.map((note) => {
              return (
                <div
                  onClick={() => handleUpdateNote(note)}
                  style={{ backgroundColor: note.color }}
                  className="note"
                  key={note._id}
                >
                  <div className="title">
                    <h4>{note.title}</h4>
                  </div>
                  <div className="content">
                    <p>{note.description}</p>
                  </div>
                  <div className="date">
                    <p>{formatDate(note.createdAt)}</p>
                  </div>
                </div>
              );
            })}

          <div className="new-note" onClick={openNote}>
            <img src={addIcon} alt="add a new note" />
            <p>Add New Note</p>
          </div>
        </div>
      </div>
    </>
  );
};

function formatDate(inputDate) {
  const dateObject = new Date(inputDate);

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  };

  return dateObject.toLocaleString("en-US", options);
}

export default Mynotes;
