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
import { PAGE_SIZE } from 'app/constants/constants';
import PokemonsList from './PokemonsList';
import * as actions from './store/actions';
import reducer from './store/reducers';
import PokeApi from './api/PokemonsApi';

class PokemonsApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading : true,
      pageSize  : 0,
      showReload: false,
    };
  }

  componentDidMount() {
    const { getUsers } = this.props;
    getUsers()
      .then(() => {
        this.setState({
          isLoading : false,
          pageSize  : PAGE_SIZE,
          showReload: false,
        });
      })
      .catch(() => {
        this.setState({ showReload: true });
      });

    const fetch = async () => {
      const list = await PokeApi.getList();
      const info = await PokeApi.getInfo(list.results[0].name);

      console.log('*** result', info);
    };

    fetch();
  }

  handleFetchData = () => {
    const { getUsers } = this.props;
    const { pageSize } = this.state;

    this.setState({ isLoading: true, showReload: false });
    getUsers(pageSize + PAGE_SIZE)
      .then(() => {
        this.setState({
          isLoading : false,
          pageSize  : pageSize + PAGE_SIZE,
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
      users,
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
          <UsersList
            total={total}
            users={users}
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
  getList   : PropTypes.func,
  pokemons  : PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  isLastPage: PropTypes.bool,
  total     : PropTypes.number,
};

PokemonsApp.defaultProps = {
  getList   : () => {},
  pokemons  : [],
  isLastPage: false,
  total     : 0,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getList: actions.getList,
  }, dispatch);
}

function mapStateToProps({ pokemonsApp }) {
  return {
    users     : pokemonsApp.users.list,
    isLastPage: pokemonsApp.users.isLastPage,
    total     : pokemonsApp.users.total,
  };
}

export default withReducer('pokemonsApp', reducer)(
  connect(mapStateToProps, mapDispatchToProps)(PokemonsApp),
);
