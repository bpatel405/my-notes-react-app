import React, { Component } from 'react';
import "./note-panel-style.css";

//testing imports
import "../test-style.css"

class NotePanel extends Component {
    render() {
        const NoteList = this.props.NoteList;
        const activeIndex = this.props.ActiveIndex;
        const changeActiveNote = this.props.changeActiveNote;
        const createNewNote = this.props.createNewNote;
        return(
            <div className='panel-container'>
                <button className='btn btn-light btn-block my-2' onClick={createNewNote}>Create New Note</button>
                <div className='note-list'>
                {
                    NoteList.map((note, index) => (
                        <button className = {activeIndex === index ? 'border btn note-option active' : 'border btn note-option'} key = {index} onClick={() => changeActiveNote(index)}>
                             {note.Title}
                        </button>
                    ))
                }
                </div>
            </div>
        );
    }
}

NotePanel.defaultProps = {
    NoteList : [],
    ActiveIndex: -1,
    changeActiveNote: console.log,
    createNewNote: console.log,
}

export default NotePanel;