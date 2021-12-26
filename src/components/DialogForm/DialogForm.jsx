/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogTitle as MuiDialogTitle,
  DialogContent as MuiDialogContent,
  DialogActions as MuiDialogActions,
  Button,
  Typography,
  IconButton,
  TextField,
  Box,
  TextareaAutosize,
  Tooltip,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const useStyles = makeStyles((theme) => ({
  field: {
    marginTop: theme.spacing(1),
  },
  actions: {
    justifyContent: "end",
  },
}));

const validationSchema = yup.object().shape({
  title: yup.string().required("Required"),
  description: yup.string().required("Required"),
});

const DialogForm = ({ dialog, onClose, deleteTask }) => {
  const classes = useStyles();
  const { register, errors, handleSubmit, setValue, control } = useForm({
    resolver: yupResolver(validationSchema),
    shouldUnregister: false,
  });

  const onSubmit = (data, e) => {
    e.preventDefault();
    if (dialog.data === null) {
      dialog.action(data, dialog.list);
      onClose();
    } else {
      const newData = {
        ...dialog.data,
        title: data.title,
        description: data.description,
      };

      dialog.action(newData, dialog.list);
      onClose();
    }
  };

  const onDelete = () => {
    if (dialog.data !== null) {
      deleteTask(dialog.data, dialog.list, dialog.index);
    }
  };

  useEffect(() => {
    if (dialog.data !== null) {
      setValue("title", dialog.data.title);
      setValue("description", dialog.data.description);
    } else {
      setValue("title", "");
      setValue("description", "");
    }
  }, [dialog.data]);

  return (
    <Dialog open={dialog.open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle onClose={onClose}>
          {dialog.data === null ? "Add" : "Edit"} Task
        </DialogTitle>
        <DialogContent dividers>
          {dialog.data !== null && dialog.data.status === 0 && (
            <Tooltip title="Delete">
              <IconButton
                onClick={() => {
                  onDelete();
                }}
                color="secondary"
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )}
          <TextField
            fullWidth
            className={classes.field}
            name="title"
            label="Title"
            inputRef={register}
            error={!!errors.title}
            helperText={errors.title?.message}
            type="text"
            required
          />

          <Box mt={3}>
            <Typography variant="body2" paragraph>
              Description*
            </Typography>
            <Controller
              name="description"
              control={control}
              render={({ onChange, ref, value }) => (
                <TextareaAutosize
                  ref={ref}
                  style={{ width: "100%" }}
                  minRows={10}
                  maxRows={10}
                  name="description"
                  defaultValue={value}
                  required
                  onChange={(e) => onChange(e.target.value)}
                />
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions className={classes.actions}>
          <Button variant="contained" color="inherit" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default DialogForm;
