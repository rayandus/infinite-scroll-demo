/* eslint-disable react/prefer-stateless-function */
/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withReducer from 'store/withReducer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { PAGE_SIZE } from 'app/constants/users/users.constants';
import UsersList from './UsersList';
import * as actions from './store/actions';
import reducer from './store/reducers';

class UsersApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      pageSize : PAGE_SIZE,
    };
  }

  componentDidMount() {
    const { getUsers } = this.props;
    getUsers()
      .then(() => {
        this.setState({ isLoading: false });
      });
  }

  handleFetchData = () => {
    const { getUsers } = this.props;
    const { pageSize } = this.state;

    this.setState({ isLoading: true });
    getUsers(pageSize + PAGE_SIZE)
      .then(() => {
        this.setState({
          isLoading: false,
          pageSize : pageSize + PAGE_SIZE,
        });
      });
  };

  render() {
    const {
      isLastPage,
      users,
      total,
    } = this.props;
    const {
      isLoading,
      pageSize,
    } = this.state;

    return (
      <InfiniteScroll
        dataLength={pageSize}
        next={this.handleFetchData}
        hasMore={!isLastPage}
        loader={isLoading && (<div style={{ marginTop: '2rem' }}>Vänta! Loading...</div>)}
      >
        <UsersList
          total={total}
          users={users}
          isLoading={isLoading}
        />
        { isLastPage && (<div style={{ marginTop: '2rem' }}>That&apos;s all we got!</div>) }
      </InfiniteScroll>
    );
  }
}

UsersApp.propTypes = {
  getUsers  : PropTypes.func,
  users     : PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  isLastPage: PropTypes.bool,
  total     : PropTypes.number,
};

UsersApp.defaultProps = {
  getUsers  : () => {},
  users     : {},
  isLastPage: false,
  total     : 0,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUsers: actions.getUsers,
  }, dispatch);
}

function mapStateToProps({ usersApp }) {
  return {
    users     : usersApp.users.list,
    isLastPage: usersApp.users.isLastPage,
    total     : usersApp.users.total,
  };
}

export default withReducer('usersApp', reducer)(
  connect(mapStateToProps, mapDispatchToProps)(UsersApp),
);
