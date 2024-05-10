/* eslint-disable react/prefer-stateless-function */
/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withReducer from 'store/withReducer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Button,
  CircularProgress,
} from '@material-ui/core';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CustomSnackbar } from 'app/components/shared';
import { PAGE_LIMIT, PAGE_OFFSET } from 'app/constants/constants';
import PokemonsList from './PokemonsList';
import * as actions from './store/actions';
import reducer from './store/reducers';

class PokemonsApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading : true,
      pageSize  : PAGE_OFFSET,
      showReload: false,
    };
  }

  componentDidMount() {
    const { getPokemons } = this.props;
    getPokemons()
      .then(() => {
        this.setState({
          isLoading : false,
          pageSize  : PAGE_LIMIT,
          showReload: false,
        });
      })
      .catch(() => {
        this.setState({ showReload: true });
      });
  }

  handleFetchData = () => {
    const { getPokemons } = this.props;
    const { pageSize } = this.state;

    this.setState({ isLoading: true, showReload: false });
    getPokemons(pageSize + PAGE_LIMIT)
      .then(() => {
        this.setState({
          isLoading : false,
          pageSize  : pageSize + PAGE_LIMIT,
          showReload: false,
        });
      })
      .catch(() => {
        this.setState({ showReload: true });
      });
  };

  getLoader = (isLoading, showReload) => {
    let loader = null;

    if (showReload) {
      loader = (
        <Button
          variant="text"
          onClick={this.handleFetchData}
          style={{ textTransform: 'none' }}
        >
          <AutorenewIcon size={15} style={{ marginRight: '0.5rem' }} />
          Something went wrong. Try again.
        </Button>
      );
    } else if (isLoading) {
      loader = (
        <>
          <CircularProgress size={15} style={{ marginRight: '0.5rem' }} />
          Patience is a virtue. Fetching more users.
        </>
      );
    }

    return loader && <div style={{ margin: '1rem 1rem 0 1rem', padding: '1rem' }}>{loader}</div>;
  }

  render() {
    const {
      isLastPage,
      pokemons,
      total,
    } = this.props;
    const {
      isLoading,
      showReload,
      pageSize,
    } = this.state;

    return (
      <>
        <InfiniteScroll
          dataLength={pageSize}
          next={this.handleFetchData}
          hasMore={!isLastPage}
          loader={this.getLoader(isLoading, showReload, isLastPage)}
          endMessage={<div style={{ margin: '1rem 1rem 0 1rem', padding: '1rem' }}>That&apos;s all we got!</div>}
        >
          <PokemonsList
            total={total}
            pokemons={pokemons}
            isLoading={isLoading}
          />
        </InfiniteScroll>
        <CustomSnackbar
          open={showReload}
          severity="error"
          message="Something went wrong. Please try again later."
        />
      </>
    );
  }
}

PokemonsApp.propTypes = {
  getPokemons: PropTypes.func,
  pokemons   : PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  isLastPage : PropTypes.bool,
  total      : PropTypes.number,
};

PokemonsApp.defaultProps = {
  getPokemons: () => {},
  pokemons   : [],
  isLastPage : false,
  total      : 0,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getPokemons: actions.getPokemons,
  }, dispatch);
}

function mapStateToProps({ pokemonsApp }) {
  return {
    pokemons  : pokemonsApp.pokemons.list,
    isLastPage: pokemonsApp.pokemons.isLastPage,
    total     : pokemonsApp.pokemons.total,
  };
}

export default withReducer('pokemonsApp', reducer)(
  connect(mapStateToProps, mapDispatchToProps)(PokemonsApp),
);
