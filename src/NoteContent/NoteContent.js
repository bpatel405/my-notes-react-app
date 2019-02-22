import React, { Component } from 'react';
import Note from '../Note.js';
import "./note-contenet-style.css";

//testing imports
import "../test-style.css"

class NoteContent extends Component {

    onChangeNoteTitle = () => {
        const title = this.refs.title.value;
        this.props.handleOnChangeNoteTitle(title);
    }

    onChangeNoteBody = () => {
        const body = this.refs.body.value;
        this.props.handleOnChangeNoteBody(body);
    }

    render() {
        let note = this.props.activeNote;
        return(
            <div className='fluid-container note-container'>
                <div className='row border-bottom'>
                    <div className='input-group note-title-group'>
                        <input type='text' className='form-control' ref='title' placeholder='Title' value={note.Title} onChange={this.onChangeNoteTitle}/>
                        <div className="input-group-append">
                            <span className="input-group-text btn btn-danger delete-btn" onClick={this.props.deleteNote}>X</span>
                        </div>
                    </div>
                </div>
                <div className='row note-body'>
                    <textarea className='form-control' ref='body' placeholder='Body' value={note.Body} onChange={this.onChangeNoteBody}></textarea>
                </div>
            </div>
        );
    }
}

NoteContent.defaultProps = {
    activeNote: new Note(),
    onChangeNoteTitle: console.log,
    onChangeNoteBody: console.log,
    deleteNote: console.log,
}

export default NoteContent;