import { useState, useEffect } from "react";
import addIcon from "../../assets/add-note.svg";
import "./Mynotes.css";
import Newnote from "../newnote/Newnote";

const Mynotes = () => {
  const [notes, setNotes] = useState(null);
  const [addNote, setNoteOpen] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await fetch("/api/notes");
      console.log(response);
      const json = await response.json();
      console.log(json);

      if (response.ok) {
        setNotes(json);
      }
    };

    fetchNotes();
  }, []);

  const openNote = () => {
    setNoteOpen(true);
  };

  const closeNote = () => {
    setNoteOpen(false);
  };

  return (
    <>
      {addNote && <Newnote closeNote />}
      <div className="outer-container">
        <div className="notes-container">
          <h2>
            Welcome <span>Kavishna</span>
          </h2>
          {notes &&
            notes.map((note) => {
              return (
                <div
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
