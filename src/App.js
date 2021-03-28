/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React from 'react';
import Provider from 'react-redux/es/components/Provider';
import { Layout } from 'app/components/layout';
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
