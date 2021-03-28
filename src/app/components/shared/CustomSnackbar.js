/* eslint-disable import/no-unresolved */
import React, { useState, useEffect } from 'react';
import {
  Snackbar,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';

const Alert = (props) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const CustomSnackbar = ({
  open,
  anchorOrigin,
  autoHideDuration,
  severity,
  message,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setIsOpen(false);
  };

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={autoHideDuration}
      anchorOrigin={anchorOrigin}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

CustomSnackbar.propTypes = {
  open            : PropTypes.bool,
  anchorOrigin    : PropTypes.oneOfType([PropTypes.object]),
  autoHideDuration: PropTypes.number,
  severity        : PropTypes.string,
  message         : PropTypes.string,
};

CustomSnackbar.defaultProps = {
  open            : false,
  anchorOrigin    : { vertical: 'top', horizontal: 'center' },
  autoHideDuration: 6000,
  severity        : 'info',
  message         : '',
};

export default CustomSnackbar;
