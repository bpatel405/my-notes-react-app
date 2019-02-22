import React, { Component } from 'react';
import "./note-panel-style.css";

//testing imports
import "../test-style.css"

class NotePanel extends Component {
    render() {
        const NoteList = this.props.NoteList;
        const activeIndex = this.props.activeIndex;
        const changeActiveNote = this.props.changeActiveNote;
        return(
            <div className='note-panel'>
                {
                    NoteList.map((note, index) => (
                        <button className = {activeIndex === index ? 'border btn note-option active' : 'border btn note-option'} key = {index} onClick={() => changeActiveNote(index)}>
                             {note.Title}
                        </button>
                    ))
                }
            </div>
        );
    }
}

NotePanel.defaultProps = {
    NoteList : [],
    activeIndex: -1,
    changeActiveNote: console.log
}

export default NotePanel;