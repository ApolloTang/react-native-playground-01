import React from 'react';
import PropTypes from 'prop-types';

import { BackHandler } from 'react-native'
import {
  addNavigationHelpers,
  NavigationActions
} from 'react-navigation';
import { connect } from 'react-redux';

import Action_Login from '../containers/login/action';
import RootNavigator from  './root-navigator';
const mapStateToProps = state => ({
  nav: state.nav,
});

@connect(mapStateToProps)
class ConnectedNavigator extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    this.onBackPress = this.onBackPress.bind(this);
  }
  componentDidMount(prevProps, prevState) {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    // console.log('componentDidMount: props_rootNavigator: ', this.props_rootNavigator);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress() {
    const { dispatch, nav } = this.props;
    if (nav.index === 0) {
      return false;
    }
    if (nav.index === 1 && nav.routes[1].index === 0) {
      dispatch(Action_Login.destroySession());
    }
    dispatch(NavigationActions.back());
    return true;
  }
  render() {
    const { dispatch , nav } = this.props;
    return (
    <RootNavigator
      ref={props_rootNavigator=>{
        // Make properties of rootNavigator available to ConnectedNavigator.
        // We do this because we might want to have access to RootNavigator's properties
        // in ConnectedNavigator.
        this.props_rootNavigator = props_rootNavigator
      }}
      navigation={
        // When navigation propperty is specifed React
        // Navigation state is now store in reducer, React Navigation
        // will no longer keep track of navigation state (nav)
        addNavigationHelpers({ dispatch, state: nav })
      }
      />
    )
  }
  componentDidUpdate(prevProps, prevState) {
    // console.log('componentDidUpdate: props_rootNavigator: ', this.props_rootNavigator);
  }
};

export default ConnectedNavigator;
