import React from 'react';

import {
  Provider,
} from 'react-redux';

import store from './store';

import ConnectedNavigator from './connected-navigator';

class App extends React.Component {
  state = {
    store
    // see https://github.com/reactjs/react-redux/issues/359
  }
  render() {
    return (
      <Provider store={this.state.store} >
        <ConnectedNavigator/>
      </Provider>
    );
  }
};

export default App;


