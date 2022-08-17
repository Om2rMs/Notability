import React from "react";
import Search from "../Search/Search";
import './Sidebar.css'


const Sidebar = ({ notes, setCurrentNoteId, newNote, deleteNote, findNote, searchNote }) => {

    const Note = notes.map((note, index) => (
        <div key={note.id}>
            <div

                className={`title ${note.id === findNote.id ? "selected-note" : ""
                    }`}
                onClick={() => setCurrentNoteId(note.id)}
            >
                <h4 className="note-name-sidebar">{note.body.split("\n")[0]}</h4>
                <button
                    className="delete-btn"
                    onClick={(event) => deleteNote(event, note.id)}
                >
                    <i className="gg-trash trash-icon"></i>
                </button>
            </div>
        </div>
    ))
    return (
        <section className="pane sidebar">
            <div className="sidebar--header">
                <h3>Notes</h3>
                <button className="button-new-note" onClick={newNote}>+</button>
            </div>
            <Search handleSearchNote={searchNote} />
            {Note}
        </section>
    )
}


export default Sidebar;