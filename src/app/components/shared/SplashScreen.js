import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import pokeBall from '../../../assets/images/pokeball.png';
import pokemonLogoType from '../../../assets/images/pokemon-logo-type.png';

const useStyles = makeStyles(() => {
  return {
    splashPanel: {
      display       : 'flex',
      margin        : 'auto',
      alignItems    : 'center',
      justifyContent: 'center',
      height        : '100vh',
      flexDirection : 'column',
    },
    logo: {
      marginBottom: '10px',
    },
    '@keyframes fadeInOut': {
      '0%': {
        opacity: '0.5',
      },
      '50%': {
        opacity: '1',
      },
      '100%': {
        opacity: '0.5',
      },
    },
    animateFadeInOut: {
      animation: '$fadeInOut 2s infinite',
    },
  };
});

const SplashScreen = () => {
  const classes = useStyles();

  return (
    <>
      <div className={clsx(classes.splashPanel, classes.animateFadeInOut)}>
        <img className={classes.logo} width="100" src={pokeBall} alt="pokeball" />
        <img height="100" src={pokemonLogoType} alt="pokemon logo type" />
      </div>
    </>
  );
};

export default SplashScreen;
