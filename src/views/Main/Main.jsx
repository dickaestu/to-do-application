import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Container, Grid, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { getTask } from "../../store/actions";
import { Tasks } from "../../components";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    minHeight: "100vh",
    minWidth: "100%",
    top: 0,
    left: 0,
    alignItems: "center",
    display: "flex",
    textAlign: "center",
  },
}));

const Main = ({ getTask, task }) => {
  const classes = useStyles();

  useEffect(() => {
    getTask();
  }, []);

  return (
    <Container maxWidth="xl" className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Tasks title="Progress" status={0} task={task} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Tasks title="Done" status={1} task={task} />
        </Grid>
      </Grid>
    </Container>
  );
};

export const mapStateToProps = (state) => {
  return {
    task: state.task,
  };
};

export default connect(mapStateToProps, { getTask })(Main);
