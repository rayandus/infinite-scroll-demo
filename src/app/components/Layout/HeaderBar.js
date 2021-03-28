/* eslint-disable import/no-unresolved */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { DRAWER_WIDTH } from 'app/constants/constants';

const useStyles = makeStyles((theme) => {
  return {
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing  : theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width     : `calc(100% - ${DRAWER_WIDTH}px)`,
      marginLeft: DRAWER_WIDTH,
      transition: theme.transitions.create(['margin', 'width'], {
        easing  : theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
  };
});

const HeaderBar = ({
  onDrawerOpen,
}) => {
  const classes = useStyles();

  return (
    <AppBar
      position="fixed"
      className={classes.appBar}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={onDrawerOpen}
          edge="start"
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          Ombori Exercise
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

HeaderBar.propTypes = {
  onDrawerOpen: PropTypes.func,
};

HeaderBar.defaultProps = {
  onDrawerOpen: () => {},
};

export default HeaderBar;
