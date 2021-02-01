import React, { useCallback } from "react";
import firebase from "firebase/app";
import { useHistory } from "react-router-dom";
import {
  Typography,
  Container,
  AppBar,
  Toolbar,
  Button,
  CircularProgress,
} from "@material-ui/core";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { FirebaseDatabaseNode } from "@react-firebase/database";

import DashboardCard from "../DasboardCard";
import { isDataReady } from "../../utils";

import { useStyles } from "./styles";

const Dashboard = () => {
  const classes = useStyles();
  const history = useHistory();

  const logoutHandler = useCallback(
    () =>
      firebase
        .auth()
        .signOut()
        .then(() => history.push('/login')),
    [history]
  );
  return (
    <Container maxWidth="lg" className={classes.wrapper}>
      <AppBar position="static">
        <Toolbar className={classes.toolBar}>
          <Typography variant="h6" className={classes.title}>
            Dashboard Quizzes List
          </Typography>
          <Button color="inherit" onClick={logoutHandler}>Logout</Button>
        </Toolbar>
      </AppBar>
      <FirebaseDatabaseNode path="quizzes/">
        {(quizzesObj) => {
          console.log("quizzesObj", quizzesObj);
          return (
            <div className={classes.contentWrapper}>
              <Fab className={classes.fab} color="primary" aria-label="add">
                <AddIcon />
              </Fab>
              {isDataReady(quizzesObj) ? (
                Object.values(quizzesObj.value).map((quiz) => (
                  <DashboardCard quiz={quiz} key={quiz.name} />
                ))
              ) : (
                <div className={classes.loaderWrapper}>
                  <CircularProgress size={60} />
                </div>
              )}
            </div>
          );
        }}
      </FirebaseDatabaseNode>
    </Container>
  );
};

export default Dashboard;
