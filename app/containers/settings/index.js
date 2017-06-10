import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Button } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { object, func } from 'prop-types';

import styles from '../../common/globalStyles';
import Card from '../../components/card/';
import Columns from '../../components/columns/';
import { mapStoreToProps, mapDispatchToProps } from './selector';

const Action_navigateToRouteReset = routeName => NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName }),
  ],
});


class Screen_Settings extends React.Component {
  constructor(props) {
    super(props);
    this.handle_destroySession = this.handle_destroySession.bind(this);
  }

  handle_destroySession() {
    this.props.dispatch_destroySession();
    this.props.navigation.dispatch(Action_navigateToRouteReset('Login'));
  }

  render() {
    const { user } = this.props;
    if (!user) {
      return (
        <View style={{ width: '100%', paddingBottom: 40 }}>
          <Card>
            <Text>The user was not loaded properly.</Text>
          </Card>
          <Card>
            <Text>
              Thank you for using Postman-Sync.
            </Text>
          </Card>
          <View style={{ ...styles.buttonContainerStyle }}>
            <Button
              onPress={this.handle_destroySession}
              title="Logout"
            />
          </View>
        </View>
      );
    }

    return (
      <View style={{ ...styles.headerStyle }}>
        <View style={{ width: '100%', paddingBottom: 40 }}>
          <Text style={styles.titleStyle}>
            {user.full_name}
          </Text>
          <Card>
            <Columns>
              <Text>
                Email:
              </Text>
              <Text>
                {user.email_address}
              </Text>
            </Columns>
            <Columns>
              <Text>
                Verified:
              </Text>
              <Text>
                {user.email_verified ? 'Yes' : 'No'}
              </Text>
            </Columns>
          </Card>
          <Card>
            <Text>
              Thank you for using Postman-Sync.
            </Text>
          </Card>
        </View>
        <View style={{ ...styles.buttonContainerStyle }}>
          <Button
            onPress={this.handle_destroySession}
            title="Logout"
          />
        </View>
      </View>
    );
  }
}

Screen_Settings.propTypes = {
  dispatch_destroySession: func.isRequired,
  navigation: object.isRequired,
  user: object,
};

Screen_Settings.defaultProps = {
  user: {},
};

export default connect(mapStoreToProps, mapDispatchToProps)(Screen_Settings);
