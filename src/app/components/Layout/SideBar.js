/* eslint-disable import/no-unresolved */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Drawer,
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import InfoIcon from '@material-ui/icons/Info';
import { DRAWER_WIDTH } from 'app/constants/constants';

const useStyles = makeStyles((theme) => {
  return {
    drawer: {
      // width     : DRAWER_WIDTH,
      // flexShrink: 0,
    },
    drawerPaper: {
      width: DRAWER_WIDTH,
    },
    drawerHeader: {
      display       : 'flex',
      alignItems    : 'center',
      padding       : theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
  };
});

const SideBar = ({
  onClose,
  isOpen,
}) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Drawer
      className={classes.drawer}
      anchor="left"
      open={isOpen}
      classes={{
        paper: classes.drawerPaper,
      }}
      ModalProps={{ onBackdropClick: onClose }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={onClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary="About" />
        </ListItem>
      </List>
    </Drawer>
  );
};

SideBar.propTypes = {
  onClose: PropTypes.func,
  isOpen : PropTypes.bool,
};

SideBar.defaultProps = {
  onClose: () => {},
  isOpen : false,
};

export default SideBar;
