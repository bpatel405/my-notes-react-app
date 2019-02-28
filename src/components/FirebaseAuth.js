// Import FirebaseAuth and firebase.
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
 
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
        <div className='fluid-container text-white' style={{height : '100vh'}}>
            <div className='row'>
                <div className='col-md-4'></div>
                <div className='col-md-4' style={{marginTop : '25vh', border : '2px solid #00b3db'}}>
                    <h1 className='d-flex justify-content-center'>My Notes</h1>
                    <p className='d-flex justify-content-center'>Please &nbsp; <b>Log-In:</b></p>
                    <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={this.props.firebase.auth()}/>
                </div>
                <div className='col-md-4'></div>
            </div>
        </div>
      );
    }
}


export default FirebaseAuth;