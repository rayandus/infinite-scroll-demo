/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import clsx from 'clsx';
// import { DRAWER_WIDTH } from 'app/constants/constants';
import { SplashScreen } from 'app/components/shared';
import UsersApp from 'app/components/users/UsersApp';
import HeaderBar from './HeaderBar';
import SideBar from './SideBar';

const styles = (theme) => {
  return {
    root: {
      display: 'flex',
    },
    drawerHeader: {
      display       : 'flex',
      alignItems    : 'center',
      padding       : theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow  : 1,
      padding   : theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing  : theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      // marginLeft: -DRAWER_WIDTH,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing  : theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  };
};

class LayoutCont extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDrawerOpen    : false,
      showSplashScreen: true,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ showSplashScreen: false });
    }, 3000);
  }

  handleDrawerOpen = () => {
    this.setState({ isDrawerOpen: true });
  };

  handleDrawerClose = () => {
    this.setState({ isDrawerOpen: false });
  };

  render() {
    const {
      isDrawerOpen,
      showSplashScreen,
    } = this.state;
    const { classes } = this.props;

    return (
      showSplashScreen
        ? <SplashScreen />
        : (
          <div className={classes.root}>
            <HeaderBar onDrawerOpen={this.handleDrawerOpen} isDrawerOpen={isDrawerOpen} />
            <SideBar onClose={this.handleDrawerClose} isOpen={isDrawerOpen} />
            <main
              className={clsx(classes.content, {
                [classes.contentShift]: isDrawerOpen,
              })}
            >
              <div className={classes.drawerHeader} />
              <UsersApp />
            </main>
          </div>
        )
    );
  }
}

LayoutCont.propTypes = {
  classes: PropTypes.oneOfType([PropTypes.object]),
};

LayoutCont.defaultProps = {
  classes: {},
};

export default withStyles(styles, { withTheme: true })(LayoutCont);
