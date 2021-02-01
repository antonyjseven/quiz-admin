import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import {FirebaseAuthConsumer, FirebaseAuthProvider} from "@react-firebase/auth";
import { FirebaseDatabaseProvider } from "@react-firebase/database";

import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

import { firebaseConfig } from "./config";

function App() {
  return (
    <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
      <FirebaseDatabaseProvider firebase={firebase} {...firebaseConfig}>
        <FirebaseAuthConsumer>
          {({ isSignedIn }) => {
            return <Router>
              <Route path="/login" render={() => isSignedIn ? <Redirect to="/dashboard" /> : <Login/>} />
              <Route path="/" render={() => <Redirect to="/dashboard" />} />
              <Route path="/dashboard" render={() => isSignedIn ? <Dashboard /> : <Redirect to="/login" />} />
            </Router>
          }}
        </FirebaseAuthConsumer>
      </FirebaseDatabaseProvider>
    </FirebaseAuthProvider>
  );
}

export default App;
