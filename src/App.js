import React, { Component } from 'react';
import Note from "./Note";
import './app-style.css';
import NotePanel from "./NotePanel/NotePanel";
import NoteContent from './NoteContent/NoteContent';

//testing imports
import "./test-style.css"

class App extends Component {
  //App Constructor
  constructor(props) {
    super(props);
    this.state = {
      NoteList : [],
      ActiveIndex : -1
    }
  }

  //change current viewing note when onClick
  handleOnChangeActiveNote = index => {
    this.setState({
      ActiveIndex : index,
    });
  }

  //change note title of activeNote
  handleOnChangeNoteTitle = title => {
    const activeIndex = this.state.ActiveIndex;
    if (activeIndex !== -1) {
      var notes = this.state.NoteList;
      notes[activeIndex].Title = title;
      this.setState({NoteList : notes});
    }
  }

  //change note body of activeNote
  handleOnChangeNoteBody = body => {
    const activeIndex = this.state.ActiveIndex;
    if (activeIndex !== -1) {
      var notes = this.state.NoteList;
      notes[activeIndex].Body = body;
      this.setState({NoteList : notes});
    }
  }

  //create new note 
  handleCreateNewNote = () => {
    let note = new Note();
    let noteList = this.state.NoteList;
    noteList.push(note);
    this.setState({
      NoteList : noteList,
      ActiveIndex : noteList.length - 1
    });
  }

  //deleteNote
  handleDeleteNote = () => {
    const activeIndex = this.state.ActiveIndex;
    let noteList = this.state.NoteList;
    delete noteList[activeIndex];
    this.setState({
      NoteList : noteList,
      ActiveIndex : -1,
    });
  }

  //Render App
  render() {
    const ActiveIndex = this.state.ActiveIndex;
    const activeNote = ActiveIndex !== -1 ? this.state.NoteList[ActiveIndex] : new Note();
    return (
      <div className = 'container-fluid app'>
        <div className = 'row'>
          <div className = 'col-md-4 col-lg-4 col-xl-4 note-panel border-right'>
            <NotePanel NoteList={this.state.NoteList} ActiveIndex={this.state.ActiveIndex} changeActiveNote={this.handleOnChangeActiveNote} createNewNote={this.handleCreateNewNote}/>
          </div>
          <div className = 'col-md-8 col-lg-8 col-xl-8 note-content'>
            {ActiveIndex !== -1 ? <NoteContent activeNote={activeNote} handleOnChangeNoteTitle={this.handleOnChangeNoteTitle} handleOnChangeNoteBody={this.handleOnChangeNoteBody} deleteNote={this.handleDeleteNote}/> : ''}
          </div>
        </div>
      </div>
    );
  }
}

export default App;