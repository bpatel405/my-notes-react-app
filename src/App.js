import React, { Component } from 'react';
import Note from "./Note";
import './app-style.css';
import NotePanel from "./NotePanel/NotePanel";
import NoteContent from './NoteContent/NoteContent';
import FirebaseAuth from "./FirebaseAuth";
import firebase from 'firebase';
require("firebase/firestore");

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
var db = firebase.firestore();

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
      db.collection('notes')
        .doc(notes[activeIndex].Id)
        .update({
          NoteTitle : title
        });
    }
  }

  //change note body of activeNote
  handleOnChangeNoteBody = body => {
    const activeIndex = this.state.ActiveIndex;
    if (activeIndex !== -1) {
      var notes = this.state.NoteList;
      db.collection('notes')
        .doc(notes[activeIndex].Id)
        .update({
          NoteBody : body,
        });
    }
  }

  //create new note 
  handleCreateNewNote = () => {
    let note = new Note();
    db.collection("notes").add({
      NoteTitle: note.Title,
      NoteBody: note.Body,
      Uid: this.state.Uid,
    });
  }

  //deleteNote
  handleDeleteNote = () => {
    let notes = this.state.NoteList;
    let activeIndex = this.state.ActiveIndex;
    db.collection("notes").doc(notes[activeIndex].Id).delete();
  }

  //change state and save info in local storage
  logInUser = user => {
    this.setState({
      NoteList: [],
      activeIndex: -1,
      DisplayName: user.displayName,
      Uid: user.uid,
    }, () => {
      localStorage.setItem("uid", this.state.Uid);
      localStorage.setItem("displayName", this.state.DisplayName);
    })
  }

  //change state and reset info in local storage
  logoutUser = () => {
    this.setState({
      NoteList : [],
      activeIndex : -1,
      DisplayName: '',
      Uid: '',
    }, () => {
      localStorage.removeItem("uid");
      localStorage.removeItem("displayName");
    })
  }

  //add new note to state if new note added to db
  onNewNoteAdd = (data, id) => {
    let note = new Note();
    note.Title = data.NoteTitle;
    note.Body = data.NoteBody;
    note.Id = id;
    let noteList = this.state.NoteList;
    noteList.push(note);
    this.setState({
      NoteList : noteList,
    });
  }

  //modify note from state if modification noted on db
  onNoteModified = (data, id) => {
    let notes = this.state.NoteList;
    let index = notes.findIndex(aNote => aNote.Id === id);
    notes[index].Title = data.NoteTitle;
    notes[index].Body = data.NoteBody;
    this.setState({
      NoteList : notes,
    });
  }

  //delete note from state if note deleted from db
  onNoteDeleted = (id) => {
    let notes = this.state.NoteList;
    notes = notes.filter(aNote => aNote.Id !== id);
    this.setState({
      NoteList: notes,
      ActiveIndex: -1
    });
  }

  //set listner for data changes
  dataListener = () => {
    this.unsubscribe = db.collection('notes')
      .where("Uid", "==", this.state.Uid)
      .onSnapshot((snapShot) => {
        snapShot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            this.onNewNoteAdd(change.doc.data(), change.doc.id);
          }
          if (change.type === 'modified') {
            this.onNoteModified(change.doc.data(), change.doc.id);
          }
          if (change.type === 'removed') {
            this.onNoteDeleted(change.doc.id);
          }
        });
      });
  }

  componentDidMount = () => {
    //check if auth state changes
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
        user => {
          if (user !== null) {
            this.logInUser(user);
            this.dataListener();
          }
          else {
            this.logoutUser();
            this.unsubscribe();
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