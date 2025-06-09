import React from "react";

const NoteList = ({ notes, onDelete }) => {
  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <div
          key={note._id}
          className="p-4 border rounded shadow-sm bg-white"
        >
          <h2 className="text-xl font-semibold">{note.title}</h2>
          <p className="text-gray-700">{note.content}</p>
          <button
            onClick={() => onDelete(note._id)}
            className="mt-2 text-sm text-red-500 hover:underline"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default NoteList;
