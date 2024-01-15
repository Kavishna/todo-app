import addIcon from "../../assets/add-note.svg";
import "./Mynotes.css";

const Mynotes = () => {
  return (
    <div className="notes-container">
      <div className="note">
        <div className="title">
          <h4>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas,
            inventore.
          </h4>
        </div>
        <div className="content">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor natus
            ut aliquid quasi asperiores voluptate assumenda distinctio rem
            dolores fugiat?
          </p>
        </div>
        <div className="date">
          <p>2023/12/03 13:01</p>
        </div>
      </div>
      <div className="new-note">
        <img src={addIcon} alt="add a new note" />
        <p>Add New Note</p>
      </div>
    </div>
  );
};

export default Mynotes;
