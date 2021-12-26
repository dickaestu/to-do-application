import React from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { ThemeProvider } from "@material-ui/styles";
import theme from "../theme";
import "../assets/css/style.scss";
import Routes from "../Routes";

// Redux
import { Provider } from "react-redux";
import store from "../store";
import Alert from "../components/UI/Alert/SnackBar/SnackBar";

// Clear Cache
import { useClearCache } from "react-clear-cache";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

// Components
import { ScrollToTop } from "../components";

const browserHistory = createBrowserHistory();

const App = () => {
  const { isLatestVersion, emptyCacheStorage } = useClearCache({
    duration: 10000000,
  });

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        {!isLatestVersion && (
          <Dialog
            open={true}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Update info"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Kami telah melakukan beberapa perubahan, silahkan update
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  emptyCacheStorage();
                }}
                color="primary"
                autoFocus
              >
                Update
              </Button>
            </DialogActions>
          </Dialog>
        )}
        <Alert />

        <Router history={browserHistory}>
          <ScrollToTop />
          <Routes />
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
