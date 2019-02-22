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
      NoteList : [new Note(), new Note(), new Note(), new Note()],
      ActiveIndex : -1
    }
  }

  //change current viewing note when onClick
  handleChangeActiveNote = index => {
    this.setState({
      ActiveIndex : index,
    });
  }

  //change note title of activeNote
  handleOnChangeNoteTitle = title => {
    const ActiveIndex = this.state.ActiveIndex;
    if (ActiveIndex !== -1) {
      var notes = this.state.NoteList;
      notes[ActiveIndex].Title = title;
      this.setState({NoteList : notes});
    }
  }

  //change note body of activeNote
  handleOnChangeNoteBody = body => {
    const ActiveIndex = this.state.ActiveIndex;
    if (ActiveIndex !== -1) {
      var notes = this.state.NoteList;
      notes[ActiveIndex].Body = body;
      this.setState({NoteList : notes});
    }
  }

  //Render App
  render() {
    const ActiveIndex = this.state.ActiveIndex;
    const activeNote = ActiveIndex !== -1 ? this.state.NoteList[ActiveIndex] : new Note();
    return (
      <div className = 'container-fluid app'>
        <div className = 'row'>
          <div className = 'col-md-4 col-lg-4 col-xl-4 note-panel border-right'>
            <NotePanel NoteList={this.state.NoteList} ActiveIndex={this.state.ActiveIndex} changeActiveNote={this.handleChangeActiveNote}/>
          </div>
          <div className = 'col-md-8 col-lg-8 col-xl-8 note-content'>
            {ActiveIndex !== -1 ? <NoteContent activeNote={activeNote} handleOnChangeNoteTitle={this.handleOnChangeNoteTitle} handleOnChangeNoteBody={this.handleOnChangeNoteBody}/> : ''}
          </div>
        </div>
      </div>
    );
  }
}

export default App;