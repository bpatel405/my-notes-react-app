import React, { Component } from 'react';
import Note from "./Note";
import './App.css';
import NotePanel from "./NotePanel/NotePanel";

//testing imports
import "./test-style.css"

class App extends Component {
  //App Constructor
  constructor(props) {
    super(props);
    this.state = {
      NoteList : [],
      ViewingNote : new Note(),
    }
  }

  //Render App
  render() {
    return (
      <div className = 'container-fluid app'>
        <div className = 'row'>
          <div className = 'col-md-4 col-lg-4 col-xl-4 note-panel border-right'>
            <NotePanel NoteList={this.state.NoteList}/>
          </div>
          <div className = 'col-md-8 col-lg-8 col-xl-8 note-content'>
            
          </div>
        </div>
      </div>
    );
  }
}

export default App;
