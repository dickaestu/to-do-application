import React from 'react'
import { Snackbar } from '@material-ui/core'
import Alerts from '@material-ui/lab/Alert'
import { connect } from 'react-redux'
import * as actions from '../../../../store/actions/index'

const SnackBarAlert = props => {
  const { open, payload } = props.alerts

  let snackBar = null
  if (open) {
    snackBar = (
      <Snackbar
        open={true}
        autoHideDuration={5000}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        key={payload.id}
        onClose={props.onCloseAlert}
      >
        <Alerts elevation={6} variant="filled" onClose={props.onCloseAlert} severity={payload.alertType}>
          {payload.msg}
        </Alerts>
      </Snackbar>
    )
  };

  return (
    <div>
      {snackBar}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    alerts: state.alert
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCloseAlert: () => dispatch(actions.removeAlert())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SnackBarAlert)
