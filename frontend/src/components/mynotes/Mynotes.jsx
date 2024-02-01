import { useState, useEffect } from "react";
import addIcon from "../../assets/add-note.svg";
import "./Mynotes.css";

const Mynotes = () => {
  const [notes, setNotes] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await fetch("/api/notes");
      const json = await response.json();
      console.log(response);

      if (response.ok) {
        setNotes(json);
      }
    };

    fetchNotes();
  }, []);
  return (
    <div className="outer-container">
      <div className="notes-container">
        <h2>
          Welcome <span>Kavishna</span>
        </h2>

        {notes &&
          notes.map((note) => {
            return (
              <div className="note" key={note._id}>
                <div className="title">
                  <h4>{note.title}</h4>
                </div>
                <div className="content">
                  <p>{note.description}</p>
                </div>
                <div className="date">
                  <p>2023/12/03 13:01</p>
                </div>
              </div>
            );
          })}

        <div className="new-note">
          <img src={addIcon} alt="add a new note" />
          <p>Add New Note</p>
        </div>
      </div>
    </div>
  );
};

export default Mynotes;
