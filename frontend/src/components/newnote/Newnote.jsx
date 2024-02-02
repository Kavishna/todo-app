import { useState } from "react";
import "./Newnote.css";
import deleteIcon from "../../assets/delete.svg";
import addIcon from "../../assets/add.svg";

const Newnote = () => {
  const [note, setNote] = useState({
    title: "",
    content: "",
    color: "#eb9adb",
  });

  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [isContentFocused, setIsContentFocused] = useState(false);

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

  const handleColorChange = (color) => {
    setNote({
      ...note,
      color,
    });
  };

  return (
    <div className="add">
      <div>X</div>
      <div className="center">
        <div
          className="container"
          style={{ border: `1px solid ${note.color}` }}
        >
          <h2>Add New Note</h2>
          <input
            type="text"
            className="title"
            placeholder="Title"
            onFocus={handleTitleFocus}
            onBlur={handleTitleBlur}
            style={titleInputStyle}
          />
          <textarea
            cols="30"
            rows="10"
            placeholder="Start typing..."
            className="description"
            onFocus={handleContentFocus}
            onBlur={handleContentBlur}
            style={contentInputStyle}
          ></textarea>
          <div className="actions">
            <div className="colors">
              <button
                className={
                  note.color === "#eb9adb"
                    ? "pink color selected"
                    : "pink color"
                }
                onClick={() => handleColorChange("#eb9adb")}
              ></button>
              <button
                className={
                  note.color === "#f2e09d"
                    ? "yellow color selected"
                    : "yellow color"
                }
                onClick={() => handleColorChange("#f2e09d")}
              ></button>
              <button
                className={
                  note.color === "#cafba3"
                    ? "green color selected"
                    : "green color"
                }
                onClick={() => handleColorChange("#cafba3")}
              ></button>
              <button
                className={
                  note.color === "#a6eafe"
                    ? "blue color selected"
                    : "blue color"
                }
                onClick={() => handleColorChange("#a6eafe")}
              ></button>
            </div>
            <div className="opts">
              <button className="delete-ico">
                <img src={deleteIcon} alt="delete this note" />
              </button>
              <button className="add-ico">
                <img src={addIcon} alt="add a note" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newnote;
