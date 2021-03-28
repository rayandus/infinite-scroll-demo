import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => {
  return {
    splashPanel: {
      position : 'fixed',
      top      : '50%',
      left     : '50%',
      transform: 'translate(-50%, -50%)',
    },
    splashIcon: {
      display     : 'inline-block',
      width       : '20px',
      height      : '20px',
      background  : '#7fb900',
      borderRadius: '50%',
      textAlign   : 'center',
      fontSize    : '30px',
      color       : '#000',
      lineHeight  : '50px',
    },
    pulsing: {
      '&:before,&:after': {
        position    : 'absolute',
        top         : '-15px',
        left        : '-15px',
        width       : '50px',
        height      : '50px',
        borderRadius: '50%',
        content     : '""',
        boxShadow   : 'inset 0 0 0 20px #7fb900',
        transition  : 'transform 0.2s, opacity 0.2s',
        animation   : '$pulsing 1s infinite',
      },
      '&:after': {
        animation: '$pulsing 1.25s infinite',
      },
    },
    '@keyframes pulsing': {
      '0%': {
        transform: 'scale(0)',
        opacity  : '0.5',
      },
      '100%': {
        transform: 'scale(1.5)',
        opacity  : '0.05',
      },
    },
  };
});

const SplashScreen = () => {
  const classes = useStyles();

  return (
    <div className={classes.splashPanel}>
      <div className={clsx(classes.splashIcon, classes.pulsing)} />
    </div>
  );
};

export default SplashScreen;
