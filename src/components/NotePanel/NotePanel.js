import React, { Component } from 'react';
import "./note-panel-style.css";
import Loader from 'react-loader-spinner';

class NotePanel extends Component {


    getInitials = str => {
        let arr = str.split(" ");
        let initial = "";
        arr.forEach(element => {
            initial += element.charAt(0);
        });
        return initial;
    }

    render() {
        const userName = this.props.UserName;
        const initial = this.getInitials(userName);
        const NoteList = this.props.NoteList;
        const activeIndex = this.props.ActiveIndex;
        const changeActiveNote = this.props.changeActiveNote;
        const createNewNote = this.props.createNewNote;
        const fetchingNoteList = this.props.FetchingNoteList;
        return(
            <div className='panel-container'>
                <div className = 'border-bottom p-1'>
                    <div className='d-flex flex-row mb-2'>
                        <div className="badge badge-secondary h1 profile-initial mt-2">{initial}</div>
                        <div className='container ml-2'>
                            <div className='row'><span className='profile-name'>{userName}</span></div>
                            <div className='row mt-1'><button className="btn btn-danger btn-sm logout-btn" onClick={this.props.onLogout}>Logout</button></div>
                        </div>
                    </div>
                </div>
                <button className='btn btn-light btn-block my-3' onClick={createNewNote}>Create New Note</button>
                <div className='note-list'>
                {
                    fetchingNoteList ?
                    <div className='d-flex justify-content-center'><Loader type='Oval' color='#00BFFF' height='100' width='100'/></div>
                    :
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
    FetchingNoteList : false,
}

export default NotePanel;