/* eslint-disable import/no-unresolved */
import React from 'react';
import PropTypes from 'prop-types';
import {
  List,
} from '@material-ui/core';
import _ from 'lodash';
import PokemonItem from './PokemonItem';

const PokemonsList = ({
  pokemons,
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
      </List>
    </>
  );
};

PokemonsList.propTypes = {
  pokemons: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

PokemonsList.defaultProps = {
  pokemons: [],
};

export default PokemonsList;
