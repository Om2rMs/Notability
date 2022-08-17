import React, { setState, useState } from "react";
import Sidebar from "../Sidebar/Sidebar"
import Editor from "../Editor/Editor";
import Split from "react-split"
import { nanoid } from "nanoid"
import { data } from "../Data/Data"
import './App.css'
import image from './../../images/note.webp'


const App = () => {

    //define notes
    const [notes, setNotes] = useState(
        () => JSON.parse(localStorage.getItem("notes")) || []
    )
    const [currentNoteId, setCurrentNoteId] = useState(
        (notes[0] && notes[0].id) || ""
    )

    const [searchText, setSearchText] = useState('');



    React.useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes))
    }, [notes])

    //create NewNote
    function createNewNote() {
        const newNote = {
            id: nanoid(),
            body: "# Type your markdown note's title here"
        }
        setNotes(prevNotes => [newNote, ...prevNotes])
        setCurrentNoteId(newNote.id)
    }

    //update Note
    function updateNote(text) {
        setNotes(oldNotes => {
            const newArray = []
            for (let i = 0; i < oldNotes.length; i++) {
                const oldNote = oldNotes[i]
                if (oldNote.id === currentNoteId) {
                    newArray.unshift({ ...oldNote, body: text })
                } else {
                    newArray.push(oldNote)
                }
            }
            return newArray
        })
    }

    //Find Note
    function findCurrentNote() {
        return notes.find(note => {
            return note.id === currentNoteId
        }) || notes[0]
    }

    //deleteNpte
    function deleteNote(event, noteId) {
        event.stopPropagation()
        setNotes(oldNotes => oldNotes.filter(note => note.id !== noteId))
    }


    return (
        <main>
            {
                notes.length > 0
                    ?
                    <Split
                        sizes={[30, 70]}
                        direction="horizontal"
                        className="split"
                    >

                        <Sidebar
                            notes={notes.filter((note) =>
                                note.body.includes(searchText)
                            )}
                            setCurrentNoteId={setCurrentNoteId}
                            findNote={findCurrentNote()}
                            newNote={createNewNote}
                            deleteNote={deleteNote}
                            searchNote={setSearchText}
                        />
                        {
                            currentNoteId &&
                            notes.length > 0 &&
                            <Editor
                                currentNote={findCurrentNote()}
                                updateNote={updateNote}
                            />
                        }
                    </Split>
                    :
                    <div className="container">
                        <div className="left-side">
                            <p className="text">Didn't add your Notes yet ?</p>
                            <button
                                className="add-notes"
                                onClick={createNewNote}
                            >
                                let's add
                            </button>
                        </div>
                        <div className="right-side">
                            <img src={image} className="image"></img>
                        </div>
                    </div>
            }
        </main>
    )
}

export default App;

