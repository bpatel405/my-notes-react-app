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
        return initial.toUpperCase();
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
                    <div className='row'>
                        <div className='d-flex flex-row mb-2 col-8'>
                            <div className="badge badge-secondary h1 profile-initial mt-2">{initial}</div>
                            <div className='container ml-2'>
                                <div className='row'><span className='profile-name'>{userName}</span></div>
                                <div className='row mt-1'><button className="btn btn-danger btn-sm logout-btn" onClick={this.props.onLogout}>Logout</button></div>
                            </div>
                        </div>
                        {/* <div className='d-flex align-items-center justify-content-end col-4'>
                            <button className='btn btn-primary' onClick={this.displayList}><i className="fas fa-bars"></i></button>
                        </div> */}
                    </div>
                </div>
                <button className='btn btn-light btn-block my-3' onClick={createNewNote}>Create New Note</button>
                <div className="card text-white">
                    <h5 className="card-header border-bottom bg-info text-center">Saved Notes</h5>
                    <div className='note-list card-body p-2' id='hide-list'>
                    {
                        fetchingNoteList ?
                        <div className='d-flex justify-content-center m-5'><Loader type='Oval' color='#00BFFF' height='100' width='100'/></div>
                        :
                        NoteList.map((note, index) => (
                            <button className = {activeIndex === index ? 'border btn note-option active' : 'border btn note-option'} key = {index} onClick={() => changeActiveNote(index)}>
                                {note.Title}
                            </button>
                        ))
                    }
                    </div>
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