import React, { Component } from 'react';
import Note from '../../classes/Note.js';
import "./note-content-style.css";

class NoteContent extends Component {

    onChangeNoteTitle = (e) => {
        const title = this.refs.title.value;
        const maxTitleLength = 50;
        if (title.length >= maxTitleLength) {
            e.preventDefault();
        }
        else {
            this.props.handleOnChangeNoteTitle(title);
        }
    }

    onChangeNoteBody = () => {
        const body = this.refs.body.value;
        this.props.handleOnChangeNoteBody(body);
    }

    handleKeyPress = (e) => {
        if (e.key === "Tab") {
            e.preventDefault();
            e.target.value += "\t";
        }
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
                    <textarea className='form-control' ref='body' placeholder='Body' value={note.Body} onChange={this.onChangeNoteBody} onKeyDown={this.handleKeyPress}></textarea>
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