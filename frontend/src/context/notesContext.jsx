import { createContext, useReducer } from "react";

const initialState = { notes: null }; // Initial state object
// Create the context using `createContext`
export const NotesContext = createContext(initialState);

export const notesReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTES":
      return {
        notes: action.payload,
      };
    case "ADD_NOTE":
      return {
        ...state,
        notes: [...state.notes, action.payload],
      };
    case "DELETE_NOTE":
      const updatedNotes = state.notes.filter(
        (note, index) => index !== action.payload
      );
      return {
        ...state,
        notes: updatedNotes,
      };
    case "UPDATE_NOTE":
      const { noteIndex, updatedNote } = action.payload;
      const updatedNotesAfterUpdate = state.notes.map((note, index) =>
        index === noteIndex ? updatedNote : note
      );
      return {
        ...state,
        notes: updatedNotesAfterUpdate,
      };
    default:
      return state;
  }
};

export const NotesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notesReducer, initialState);

  const addNote = (newNote) => {
    dispatch({ type: "ADD_NOTE", payload: newNote });
  };
  const updateNote = (id, updatedNote) => {
    dispatch({ type: "UPDATE_NOTE", payload: { id, updatedNote } });
  };
  const deleteNote = (id) => {
    dispatch({ type: "DELETE_NOTE", payload: id });
  };

  const value = { ...state, addNote, updateNote, deleteNote };

  return (
    <NotesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </NotesContext.Provider>
  );
};
