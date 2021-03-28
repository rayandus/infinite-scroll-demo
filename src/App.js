/* eslint-disable import/no-unresolved */
import React from 'react';
// import { ThemeProvider } from '@material-ui/core/styles';
import Provider from 'react-redux/es/components/Provider';
import Layout from './app/components/layout/Layout';
import store from './store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Layout />
      </Provider>
    </div>
  );
}

export default App;
