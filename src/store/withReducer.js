/* eslint-disable import/no-unresolved */
import React from 'react';
import { injectReducer } from 'store';
import { ReactReduxContext } from 'react-redux';

const withReducer = (key, reducer) => {
  return (WrappedComponent) => {
    return class extends React.PureComponent {
      constructor(props) {
        super(props);
        injectReducer(key, reducer);
      }

      render() {
        return (
          <ReactReduxContext.Consumer>
            {() => {
              // return storeState && storeState[key] ? <WrappedComponent {...this.props} /> : null;
              // To Do: Expected to check storeState
              // eslint-disable-next-line react/jsx-props-no-spreading
              return <WrappedComponent {...this.props} />;
            }}
          </ReactReduxContext.Consumer>
        );
      }
    };
  };
};

export default withReducer;
