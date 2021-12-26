import React from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Box,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import TimerIcon from "@material-ui/icons/Timer";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  iconProgress: {
    color: "#CD1818",
  },
  iconDone: {
    color: "#1abc9c",
  },
  listProgress: {
    "&:hover": {
      textDecoration: "line-through",
    },
  },
  listDone: {},
}));

const Tasks = (props) => {
  const { title, status, task } = props;
  const classes = useStyles();

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography variant="h5">{title}</Typography>
          {status === 0 ? (
            <TimerIcon className={classes.iconProgress} />
          ) : (
            <CheckCircleIcon className={classes.iconDone} />
          )}
        </Box>
      </CardContent>
      <Divider />
      <CardContent>
        <List component="nav">
          {task.loading ? (
            Array(4)
              .fill("a")
              .map((_, index) => <Skeleton height={40} key={index} />)
          ) : task.data.length > 0 ? (
            task.data.map((val) => {
              return (
                <ListItem button key={val.id}>
                  <ListItemText
                    className={clsx({
                      [classes.listProgress]: status === 0,
                      [classes.listDone]: status === 1,
                    })}
                  >
                    {val.title}
                  </ListItemText>
                </ListItem>
              );
            })
          ) : (
            <li>Data Tidak Tersedia</li>
          )}
        </List>
      </CardContent>
    </Card>
  );
};

export default Tasks;
