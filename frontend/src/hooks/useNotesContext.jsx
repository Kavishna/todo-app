import { useContext } from "react";
import { NotesContext } from "../context/notesContext";

export const useNotesContext = () => {
  const context = useContext(NotesContext);
  console.log("useNotesContext");
  console.log(context);

  if (!context)
    throw new Error("useNotesContext must use inside notesContextProvider");

  return context;
};
