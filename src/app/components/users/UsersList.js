/* eslint-disable import/no-unresolved */
import React from 'react';
import PropTypes from 'prop-types';
import {
  List,
} from '@material-ui/core';
import { PAGE_SIZE } from 'app/constants/users/users.constants';
import _ from 'lodash';
import UserItem from './UserItem';

const UsersList = ({
  total,
  users,
  isLoading,
}) => {
  const remainingCount = (total ? total - PAGE_SIZE : PAGE_SIZE);

  return (
    <>
      <List>
        {_.map(_.keys(users), (id) => {
          const user = users[id];
          return (
            <UserItem
              key={id}
              id={id}
              data={user}
            />
          );
        })}
        {isLoading && _.map(_.range(remainingCount), (id) => {
          return (
            <UserItem
              key={`skltn-${id}`}
              isSkeleton
            />
          );
        })}
      </List>
    </>
  );
};

UsersList.propTypes = {
  total    : PropTypes.number,
  users    : PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  isLoading: PropTypes.bool,
};

UsersList.defaultProps = {
  total    : 0,
  users    : [],
  isLoading: false,
};

export default UsersList;
