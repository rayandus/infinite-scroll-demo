/* eslint-disable import/no-unresolved */
import React from 'react';
import {
  ListItem,
  Grid,
  Avatar,
  Typography,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import PropTypes from 'prop-types';

const PokemonItem = ({
  isSkeleton,
  data,
}) => {
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
              : <Avatar src={data.avatar} style={{ width: 65, height: 65 }} />
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
                  <Typography variant="subtitle1">{`${data.first_name} ${data.last_name}`}</Typography>
                  <Typography variant="caption" color="textSecondary">{data.email}</Typography>
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
