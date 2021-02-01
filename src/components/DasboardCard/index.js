import React from "react";
import { Card, CardContent, Typography, Button } from "@material-ui/core";

import { useStyles } from "./styles";

const DashboardCard = ({ quiz }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <img className={classes.media} src={quiz.backgroundImage} alt="" />
      <CardContent className={classes.content}>
        <Typography align="left" variant="h6" color="textPrimary" gutterBottom>
          <b>{quiz.name}</b>
        </Typography>
        <Typography
          align="left"
          variant="body2"
          color="textSecondary"
          className={classes.title}
          gutterBottom
        >
          <b>{quiz.title}</b>
        </Typography>
        <div className={classes.buttonsWrapper}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
