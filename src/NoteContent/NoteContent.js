import React, { Component } from 'react';
import "./note-contenet-style.css";

//testing imports
import "../test-style.css"


class NoteContent extends Component {
    render() {
        return(
            <div className='fluid-container '>
                <div className='row border-bottom note-title'>
                    <input type='text' class='form-control' placeholder='Title'/>
                </div>
                <div className='row note-body'>
                    <textarea class='form-control' placeholder='Body'></textarea>
                </div>
            </div>
        );
    }
}

export default NoteContent;