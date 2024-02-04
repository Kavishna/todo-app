import { useState, useEffect } from "react";
import "./Newnote.css";
import deleteIcon from "../../assets/delete.svg";
import addIcon from "../../assets/add.svg";
import closeIcon from "../../assets/close.svg";

const Newnote = ({ noteState, closeNote, updateData }) => {
  const [note, setNote] = useState({
    title: "",
    description: "",
    color: "#eb9adb",
  });
  const [isLoading, setIsLoading] = useState(true);

  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [isContentFocused, setIsContentFocused] = useState(false);

  const [error, setError] = useState(null);

  if (updateData) {
    setNote({
      ...note,
      title: updateData.title,
      description: updateData.description,
      color: updateData.color,
    });
    console.log(updateData.title);
  }

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
    setIsLoading(true);

    try {
      const response = await fetch("api/notes", {
        method: "POST",
        body: JSON.stringify(note),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const json = await response.json();
        setError(json.error);
        console.log(json.error);
      } else {
        setError(null);
        setNote({
          ...note,
          title: "",
          description: "",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="add">
      <div className="x" onClick={(e) => closeNote()}>
        <img src={closeIcon} alt="close window" />
      </div>
      <div className="center">
        <h2>{noteState}</h2>
        <form
          className={isLoading ? "container loader" : "container"}
          style={{ border: `1px solid ${note.color}` }}
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            className="title "
            placeholder="Title"
            onFocus={handleTitleFocus}
            onBlur={handleTitleBlur}
            style={titleInputStyle}
            disabled={isLoading}
            onChange={(e) => setTitle(e)}
            value={note.title}
          />
          <textarea
            cols="30"
            rows="10"
            placeholder="Start typing..."
            className="description"
            onFocus={handleContentFocus}
            onBlur={handleContentBlur}
            style={contentInputStyle}
            disabled={isLoading}
            onChange={(e) => setDescription(e)}
            value={note.description}
          ></textarea>
          <div className="actions">
            <div className="colors">
              <button
                disabled={isLoading}
                className={
                  note.color === "#eb9adb"
                    ? "pink color selected"
                    : "pink color"
                }
                onClick={(e) => handleColorChange(e, "#eb9adb")}
              ></button>
              <button
                disabled={isLoading}
                className={
                  note.color === "#f2e09d"
                    ? "yellow color selected"
                    : "yellow color"
                }
                onClick={(e) => handleColorChange(e, "#f2e09d")}
              ></button>
              <button
                disabled={isLoading}
                className={
                  note.color === "#cafba3"
                    ? "green color selected"
                    : "green color"
                }
                onClick={(e) => handleColorChange(e, "#cafba3")}
              ></button>
              <button
                disabled={isLoading}
                className={
                  note.color === "#a6eafe"
                    ? "blue color selected"
                    : "blue color"
                }
                onClick={(e) => handleColorChange(e, "#a6eafe")}
              ></button>
            </div>
            <div className="opts">
              <button className="delete-ico" disabled={isLoading}>
                <img src={deleteIcon} alt="delete this note" />
              </button>
              <button type="submit" className="add-ico" disabled={isLoading}>
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
