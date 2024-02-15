import React, { createContext, useContext, useReducer } from "react";

// Define initial state for notes
const initialState = {
  notes: [],
};

// Define actions to manipulate notes state
const notesReducer = (state, action) => {
  // console.log("actions to manipulate notes");
  // console.log(action);
  switch (action.type) {
    case "SET_NOTES":
      return {
        notes: action.payload,
      };
    case "ADD_NOTE":
      return {
        notes: [...state.notes, action.payload],
      };
    case "UPDATE_NOTE":
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id ? action.payload : note
        ),
      };
    case "DELETE_NOTE":
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };
    default:
      return state;
  }
};

// Create NotesContext
export const NotesContext = createContext();

// NotesContextProvider component
export const NotesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notesReducer, initialState);

  return (
    <NotesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </NotesContext.Provider>
  );
};
