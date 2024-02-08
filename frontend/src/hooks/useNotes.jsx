import { useContext } from "react";
import { NotesContext } from "../context/notesContext";

export const useNotes = () => {
  const context = useContext(NotesContext);

  if (!context)
    throw new Error("useNotesContext must use inside WorkoutContextProvider");

  return context;
};
