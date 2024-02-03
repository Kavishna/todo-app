import { useState } from "react";
import "./Newnote.css";
import deleteIcon from "../../assets/delete.svg";
import addIcon from "../../assets/add.svg";
import closeIcon from "../../assets/close.svg";

const Newnote = () => {
  const [note, setNote] = useState({
    title: "",
    description: "",
    color: "#eb9adb",
  });

  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [isContentFocused, setIsContentFocused] = useState(false);

  const [error, setError] = useState(null);

  const handleTitleFocus = () => {
    setIsTitleFocused(true);
  };

  const handleTitleBlur = () => {
    setIsTitleFocused(false);
  };

  const handleContentFocus = () => {
    setIsContentFocused(true);
  };

  const handleContentBlur = () => {
    setIsContentFocused(false);
  };

  const titleInputStyle = {
    border: `1px solid ${isTitleFocused ? note.color : "transparent"}`,
  };

  const contentInputStyle = {
    border: `1px solid ${isContentFocused ? note.color : "transparent"}`,
  };

  const handleColorChange = (e, color) => {
    e.preventDefault();
    setNote({
      ...note,
      color,
    });
  };

  const setDescription = (e) => {
    e.preventDefault();
    setNote({ ...note, description: e.target.value });
  };
  const setTitle = (e) => {
    e.preventDefault();
    setNote({ ...note, title: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(note);

    const response = await fetch("api/notes", {
      method: "POST",
      body: JSON.stringify(note),
      headers: { "Content-Type": "application/json" },
    });

    const json = response.json();

    if (!response.ok) {
      setError(json.error);
      console.log(json.error);
    }
    if (response.ok) {
      setError(null);
      setNote({
        title: "",
        content: "",
        color: "#eb9adb",
      });
    }
  };

  return (
    <div className="add">
      <div className="x">
        <img src={closeIcon} alt="close window" />
      </div>
      <div className="center">
        <h2>Add New Note</h2>
        <form
          className="container"
          style={{ border: `1px solid ${note.color}` }}
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            className="title"
            placeholder="Title"
            onFocus={handleTitleFocus}
            onBlur={handleTitleBlur}
            style={titleInputStyle}
            onChange={(e) => setTitle(e)}
          />
          <textarea
            cols="30"
            rows="10"
            placeholder="Start typing..."
            className="description"
            onFocus={handleContentFocus}
            onBlur={handleContentBlur}
            style={contentInputStyle}
            onChange={(e) => setDescription(e)}
          ></textarea>
          <div className="actions">
            <div className="colors">
              <button
                className={
                  note.color === "#eb9adb"
                    ? "pink color selected"
                    : "pink color"
                }
                onClick={(e) => handleColorChange(e, "#eb9adb")}
              ></button>
              <button
                className={
                  note.color === "#f2e09d"
                    ? "yellow color selected"
                    : "yellow color"
                }
                onClick={(e) => handleColorChange(e, "#f2e09d")}
              ></button>
              <button
                className={
                  note.color === "#cafba3"
                    ? "green color selected"
                    : "green color"
                }
                onClick={(e) => handleColorChange(e, "#cafba3")}
              ></button>
              <button
                className={
                  note.color === "#a6eafe"
                    ? "blue color selected"
                    : "blue color"
                }
                onClick={(e) => handleColorChange(e, "#a6eafe")}
              ></button>
            </div>
            <div className="opts">
              <button className="delete-ico">
                <img src={deleteIcon} alt="delete this note" />
              </button>
              <button type="submit" className="add-ico">
                <img src={addIcon} alt="add a note" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Newnote;
