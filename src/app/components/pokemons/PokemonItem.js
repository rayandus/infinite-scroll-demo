/* eslint-disable import/no-unresolved */
import React, { useMemo } from 'react';
import {
  ListItem,
  Grid,
  Avatar,
  Typography,
  Chip,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => {
  return {
    avatar: {
      '& img': {
        objectFit: 'contain',
      },
    },
    name: {
      textTransform: 'capitalize',
    },
    abilities: {
      display: 'flex',
      gap    : '5px',
    },
  };
});

const PokemonItem = ({
  isSkeleton,
  data,
}) => {
  const styles = useStyles();

  const abilities = useMemo(() => {
    if (!data.abilities) {
      return [];
    }

    return data.abilities.map((ability) => {
      return ability.ability.name;
    });
  }, [data.abilities]);

  return (
    <ListItem
      button
      divider
    >
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          {
            isSkeleton
              ? <Skeleton variant="circle" width={65} height={65} />
              : <Avatar className={styles.avatar} src={data.sprites.other.dream_world.front_default} variant="square" style={{ width: 65, height: 65 }} />
          }
        </Grid>
        <Grid item xs>
          {
            isSkeleton
              ? (
                <>
                  <Skeleton variant="text" height={30} animation="wave" />
                  <Skeleton variant="text" height={20} width={200} animation="wave" />
                </>
              )
              : (
                <>
                  <Typography className={styles.name} variant="subtitle1">{data.name}</Typography>
                  <div className={styles.abilities}>
                    {abilities.map((ability) => {
                      return (
                        <Chip key={ability} label={ability} variant="outlined" size="small" />
                      );
                    })}
                  </div>
                </>
              )
          }

        </Grid>
      </Grid>
    </ListItem>
  );
};

PokemonItem.propTypes = {
  data      : PropTypes.oneOfType([PropTypes.object]),
  isSkeleton: PropTypes.bool,
};

PokemonItem.defaultProps = {
  data      : {},
  isSkeleton: false,
};

export default PokemonItem;
