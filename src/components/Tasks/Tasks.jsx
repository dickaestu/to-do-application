import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Typography,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import TimerIcon from "@material-ui/icons/Timer";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import EditIcon from "@material-ui/icons/Edit";
import clsx from "clsx";
import { DialogForm } from "..";

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
  const { title, status, task, createTask, updateTask } = props;
  const [dialogForm, setDialogForm] = useState({
    open: false,
    data: null,
    action: null,
  });
  const classes = useStyles();
  let newData = [];

  if (task.data.length > 0) {
    newData = task.data.filter((val) => {
      return val.status === status;
    });
  }

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
            newData.map((val) => {
              return (
                <ListItem button key={val.id}>
                  <ListItemText
                    className={clsx({
                      [classes.listProgress]: status === 0,
                      [classes.listDone]: status === 1,
                    })}
                  >
                    <Box display="flex" justifyContent="space-between">
                      <Box>
                        <Typography variant="body1">{val.title}</Typography>
                        <Typography variant="body2">{val.createdAt}</Typography>
                      </Box>
                      <Tooltip title="Edit">
                        <IconButton
                          onClick={() => {
                            setDialogForm({
                              open: true,
                              data: val,
                              action: updateTask,
                              list: task.data,
                            });
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </ListItemText>
                </ListItem>
              );
            })
          ) : (
            <li>Data Tidak Tersedia</li>
          )}
        </List>
      </CardContent>
      <Divider />
      {status === 0 && (
        <CardActions>
          <Button
            onClick={() => {
              setDialogForm({
                open: true,
                data: null,
                action: createTask,
                list: task.data,
              });
            }}
            fullWidth
            variant="contained"
            color="primary"
          >
            Add Task
          </Button>
        </CardActions>
      )}
      <DialogForm
        dialog={dialogForm}
        onClose={() => setDialogForm({ open: false, data: null, action: null })}
      />
    </Card>
  );
};

export default Tasks;
