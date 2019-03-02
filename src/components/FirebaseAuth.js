// Import FirebaseAuth and firebase.
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Modal } from "react-bootstrap";
 
class FirebaseAuth extends React.Component {
 
  // Configure FirebaseUI.
  uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      this.props.firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false
    }
  };
 
  render() {
      return (
            <Modal {...this.props} size="md" style={{backgroundColor : '#282c34'}} aria-labelledby="contained-modal-title-vcenter" centered>
              <Modal.Body>
                <h4 className='d-flex justify-content-center'>My Notes</h4>
                <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={this.props.firebase.auth()}/>
              </Modal.Body>
            </Modal>
          );
    }
}


export default FirebaseAuth;