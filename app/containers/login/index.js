import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Button } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { string, bool, func, object } from 'prop-types';

import styles from '../../common/globalStyles';
import Input from '../../components/input';
import AppLoadingView from '../../components/appLoadingView';
import Spinner from '../../components/spinner/';
import Card from '../../components/card/';
import { mapStoreToProps, mapDispatchToProps } from './selector';

const Action_navigateToRoute = routeName => NavigationActions.navigate({ routeName });

class Screen_Login extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.handle_emailChange = this.handle_emailChange.bind(this);
    this.handle_passwordChange = this.handle_passwordChange.bind(this);
    this.handle_login = this.handle_login.bind(this);
    this.handle_signup = this.handle_signup.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const isLoggedIn_prev = this.props.isLoggedIn;
    const isLoggedIn_next = nextProps.isLoggedIn;
    if (!isLoggedIn_prev && isLoggedIn_next) {
      nextProps.navigation.dispatch(Action_navigateToRoute('Dashboard'));
    }
  }

  handle_emailChange(email) {
    this.setState({ email });
  }

  handle_passwordChange(password) {
    this.setState({ password });
  }

  handle_login() {
    // FOR DEV ONLY
    let email = this.state.email;
    let password = this.state.password;

    if (__DEV__) {
      email = 'test_0@test.com';
      password = 'password';
    }

    this.props.dispatch_createSession(email, password, 'extra');
  }

  handle_signup() {
  }

  render() {
    const isLoading = false;  // @TODO waiting for app to finishing bootstrap, rehydrate etc...
    if (isLoading) {
      return (
        <AppLoadingView />
      );
    }

    return (
      <View style={{ height: '100%', flexDirection: 'column', justifyContent: 'space-around' }}>
        <View style={{ height: 300, flexDirection: 'column', justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10 }}>
          <View style={{ ...styles.headerStyle }}>
            <Text style={{ fontSize: 40 }}>
               Postman
            </Text>
          </View>
          <Card>
            <View style={{ height: 100, justifyContent: 'center' }}>
              <Input
                label="Email:"
                value={this.state.email}
                onChangeText={this.handle_emailChange}
                autoCorrect={false}
                placeholder="dli@quartermaster.house"
              />
              <Input
                label="Password:"
                value={this.state.password}
                onChangeText={this.handle_passwordChange}
                placeholder="hunter2"
                autoCorrect={false}
                secureTextEntry
              />
            </View>
          </Card>
          <View style={styles.headerStyle}>
            <Text style={styles.errorStyle}>
              {this.props.loginError}
            </Text>
          </View>
          <View style={{ ...styles.buttonContainerStyle, height: 80 }}>
            {
              this.props.isLoading
              ?
                <Spinner size="large" />
              :
                <Button
                  onPress={this.handle_login}
                  title="Login"
                />
            }
            {
              /* @TODO - SIGNUP
              <Button
                onPress={() => {
                  console.log(this.state.email)
                  console.log(this.state.password)
                  this.props.navigation.dispatch(
                    Action_navigateToRoute('Dashboard')
                  )}}
                title="Sign up"
              />
              */
            }
          </View>
        </View>
      </View>
    );
  }
}

Screen_Login.propTypes = {
  loginError: string,
  isLoading: bool,
  isLoggedIn: bool,
  dispatch_createSession: func.isRequired,
  navigation: object,
};

Screen_Login.defaultProps = {
  loginError: '',
  isLoading: false,
  isLoggedIn: false,
};

export default connect(mapStoreToProps, mapDispatchToProps)(Screen_Login);
