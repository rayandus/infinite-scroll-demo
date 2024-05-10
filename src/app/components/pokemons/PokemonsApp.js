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
      isLoading: true,
      pageSize : PAGE_OFFSET,
      isError  : false,
    };
  }

  componentDidMount() {
    const { getPokemons } = this.props;
    getPokemons()
      .then(() => {
        this.setState({
          isLoading: false,
          pageSize : PAGE_LIMIT,
          isError  : false,
        });
      })
      .catch(() => {
        this.setState({ isError: true });
      });
  }

  handleFetchData = () => {
    const { getPokemons } = this.props;
    const { pageSize } = this.state;

    this.setState({ isLoading: true, isError: false });
    getPokemons(pageSize + PAGE_LIMIT)
      .then(() => {
        this.setState({
          isLoading: false,
          pageSize : pageSize + PAGE_LIMIT,
          isError  : false,
        });
      })
      .catch(() => {
        this.setState({ isError: true });
      });
  };

  render() {
    const {
      isLastPage,
      pokemons,
      total,
    } = this.props;
    const {
      isLoading,
      isError,
    } = this.state;

    return (
      <>
        <InfiniteScroll
          dataLength={total}
          next={this.handleFetchData}
          hasMore={!isLastPage}
          loader={
            isError ? (
              <Button
                variant="text"
                onClick={this.handleFetchData}
                style={{ textTransform: 'none', display: 'flex', margin: 'auto' }}
              >
                <AutorenewIcon size={15} style={{ marginRight: '0.5rem' }} />
                Something went wrong. Try again.
              </Button>
            ) : (
              <div style={{
                display: 'flex', margin: 'auto', alignItems: 'center', width: 'fit-content',
              }}
              >
                <CircularProgress size={15} style={{ marginRight: '0.5rem' }} />
                Catching more pokemons
              </div>
            )
          }
          endMessage={<div style={{ margin: '1rem 1rem 0 1rem', padding: '1rem' }}>That&apos;s all we got!</div>}
        >
          <PokemonsList
            total={total}
            pokemons={pokemons}
            isLoading={isLoading}
          />
        </InfiniteScroll>
        <CustomSnackbar
          open={isError}
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
