import React, { Component } from 'react';
// import Note from "../Note";
import "./NotePanel.css";

//testing imports
import "../test-style.css"

class NotePanel extends Component {
    render() {
        const NoteList = this.props.NoteList;
        return(
            <div>
                <button className = 'border btn note-option'>
                    Note 1
                </button>
                <button className = 'border btn note-option'>
                    Note 1
                </button>
                {
                    NoteList.map((note, index) => (
                        <button className = 'border btn note-option' key = {index}>
                             {note.Title}
                        </button>
                    ))
                }
            </div>
        );
    }
}

export default NotePanel;