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
        top         : '-65px',
        left        : '-65px',
        width       : '150px',
        height      : '150px',
        borderRadius: '50%',
        content     : '""',
        boxShadow   : 'inset 0 0 0 50px #7fb900',
        transition  : 'transform 0.2s, opacity 0.2s',
        animation   : '$pulsing 1.25s infinite',
      },
      '&:after': {
        animation: '$pulsing 1.5s infinite',
      },
    },
    '@keyframes pulsing': {
      '0%': {
        transform: 'scale(0)',
        opacity  : '0.5',
      },
      '100%': {
        transform: 'scale(1.5)',
        opacity  : '0',
      },
    },
    logo: {
      position: 'absolute',
      top     : '-40px',
      left    : '-40px',
    },
  };
});

const SplashScreen = () => {
  const classes = useStyles();

  return (
    <div className={classes.splashPanel}>
      <div className={clsx(classes.splashIcon, classes.pulsing)} />
      <img className={classes.logo} width="100" src="assets/images/logos/aoe.png" alt="logo" />
    </div>
  );
};

export default SplashScreen;
