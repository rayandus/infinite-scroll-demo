/* eslint-disable import/no-unresolved */
import React from 'react';
import PropTypes from 'prop-types';
import {
  List,
} from '@material-ui/core';
import { PAGE_LIMIT } from 'app/constants/constants';
import _ from 'lodash';
import PokemonItem from './PokemonItem';

const PokemonsList = ({
  total,
  pokemons,
  isLoading,
}) => {
  return (
    <>
      <List>
        {_.map(_.keys(pokemons), (id) => {
          const pokemon = pokemons[id];

          return (
            <PokemonItem
              key={id}
              id={id}
              data={pokemon}
            />
          );
        })}
        {isLoading && _.map(_.range(PAGE_LIMIT), (id) => {
          return (
            <PokemonItem
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
  pokemons : PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  isLoading: PropTypes.bool,
};

PokemonsList.defaultProps = {
  total    : 0,
  pokemons : [],
  isLoading: false,
};

export default PokemonsList;
