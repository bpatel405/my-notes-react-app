import React, { Component } from 'react';
import Note from "./Note";
import './app-style.css';
import NotePanel from "./NotePanel/NotePanel";
import NoteContent from './NoteContent/NoteContent';
import FirebaseAuth from "./FirebaseAuth";
import firebase from 'firebase';

// Configure Firebase.
const config = {
  apiKey: "AIzaSyBVQGQ4DwJqToUGeFeEjM8BKabG2ux2fUM",
  authDomain: "my-notes-2fa1c.firebaseapp.com",
  databaseURL: "https://my-notes-2fa1c.firebaseio.com",
  projectId: "my-notes-2fa1c",
  storageBucket: "my-notes-2fa1c.appspot.com",
  messagingSenderId: "761603453110"
};
firebase.initializeApp(config);
var database = firebase.database();

class App extends Component {
  //App Constructor
  constructor(props) {
    super(props);
    let uid = localStorage.getItem("uid") !== null ? localStorage.getItem("uid") : '';
    let displayName = localStorage.getItem("displayName") !== null ? localStorage.getItem("displayName") : '';
    this.state = {
      Uid : uid,
      DisplayName : displayName,
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

  logInUser = user => {
    this.setState({
      DisplayName: user.displayName,
      Uid: user.uid,
    }, () => {
      localStorage.setItem("uid", this.state.Uid);
      localStorage.setItem("displayName", this.state.DisplayName);
    })
  }

  logoutUser = () => {
    this.setState({
      DisplayName: '',
      Uid: '',
    }, () => {
      localStorage.removeItem("uid");
      localStorage.removeItem("displayName");
    })
  }

  componentDidMount = () => {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
        user => {
          if (user !== null) {
            this.logInUser(user);
          }
          else {
            this.logoutUser();
          }
        }
    );
  }

  componentWillUnmount = () => {
    this.unregisterAuthObserver();
  }

  //Render App
  render() {
    const activeIndex = this.state.ActiveIndex;
    const activeNote = activeIndex !== -1 ? this.state.NoteList[activeIndex] : new Note();
    const uid = this.state.Uid;
    const userName = this.state.DisplayName;
    const noteList = this.state.NoteList;
    return (
      <div className = 'container-fluid app'>
        { (uid === "")
          ? <FirebaseAuth firebase={firebase} />
          :
          <div className = 'row'>
            <div className = 'col-md-4 col-lg-4 col-xl-4 note-panel border-right'>
              <NotePanel UserName={userName} NoteList={noteList} ActiveIndex={activeIndex} changeActiveNote={this.handleOnChangeActiveNote} createNewNote={this.handleCreateNewNote} onLogout={() => firebase.auth().signOut()}/>
            </div>
            <div className = 'col-md-8 col-lg-8 col-xl-8 note-content'>
              {activeIndex !== -1 ? <NoteContent activeNote={activeNote} handleOnChangeNoteTitle={this.handleOnChangeNoteTitle} handleOnChangeNoteBody={this.handleOnChangeNoteBody} deleteNote={this.handleDeleteNote}/> : ''}
            </div>
          </div>
        }
      </div>
    );
  }
}

export default App;