/* eslint-disable import/no-unresolved */
import React from 'react';
import PropTypes from 'prop-types';
import {
  List,
} from '@material-ui/core';
import { PAGE_LIMIT } from 'app/constants/.constants';
import _ from 'lodash';
import UserItem from './PokemonItem';

const PokemonsList = ({
  total,
  users,
  isLoading,
}) => {
  const remainingCount = (total ? total - PAGE_LIMIT : PAGE_LIMIT);

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

PokemonsList.propTypes = {
  total    : PropTypes.number,
  users    : PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  isLoading: PropTypes.bool,
};

PokemonsList.defaultProps = {
  total    : 0,
  users    : [],
  isLoading: false,
};

export default PokemonsList;
