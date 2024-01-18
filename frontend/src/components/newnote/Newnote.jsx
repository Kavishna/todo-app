import "./Newnote.css";
import deleteIcon from "../../assets/delete.svg";
import addIcon from "../../assets/add.svg";

const Newnote = () => {
  return (
    <div className="add">
      <div className="center">
        <div className="container">
          <h2>Add New Note</h2>
          <input type="text" className="title" placeholder="Title" />
          <textarea
            cols="30"
            rows="10"
            placeholder="Start typing..."
            className="description"
          ></textarea>
          <div className="actions">
            <div className="colors">
              <button className="pink color"></button>
              <button className=" yellow color selected"></button>
              <button className="green color"></button>
              <button className="blue color"></button>
            </div>
            <div className="opts">
              <button className="delete">
                <img src={deleteIcon} alt="delete this note" />
              </button>
              <button className="add">
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
