import { useState, useEffect } from "react";
import "./Newnote.css";
import deleteIcon from "../../assets/delete.svg";
import addIcon from "../../assets/add.svg";
import closeIcon from "../../assets/close.svg";

const Newnote = ({ noteState, closeNote, updateData }) => {
  useEffect(() => {
    if (updateData) {
      setNote({
        ...note,
        title: updateData.title,
        description: updateData.description,
        color: updateData.color,
      });
    }
    setError(false);
  }, []);

  const [note, setNote] = useState({
    title: "",
    description: "",
    color: "#eb9adb",
  });
  const [isLoading, setIsLoading] = useState(false);

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
      setError(error);
    } finally {
      setIsLoading(false);
      if (!error) closeNote();
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`api/notes/${updateData.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
      } else {
        console.error(
          "Error deleting resource:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error deleting resource:", error);
      setError(error);
    } finally {
      setIsLoading(false);
      if (!error) closeNote();
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`api/notes/${updateData.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      });

      if (response.ok) {
        const result = await response.json();
      } else {
        console.error(
          "Error updating resource:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error updating resource:", error);
      setError(error);
    } finally {
      setIsLoading(false);
      if (!error) closeNote();
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
          onSubmit={updateData ? handleUpdate : handleSubmit}
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
              <button
                className="delete-ico"
                onClick={handleDelete}
                disabled={isLoading}
              >
                <img src={deleteIcon} alt="delete this note" />
              </button>
              <button type="submit" className="add-ico" disabled={isLoading}>
                <img src={addIcon} alt="add a note" />
              </button>
            </div>
          </div>
        </form>
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Newnote;
