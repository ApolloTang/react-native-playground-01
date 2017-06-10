import React from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import { func } from 'prop-types';
import _ from 'lodash';

import styles from '../../common/globalStyles';
import Card from '../../components/card/';
import Columns from '../../components/columns/';
import DateFormat from '../../components/dateformat/';
import Subscribe from '../../components/subscribe/';
import { mapStoreToProps, mapDispatchToProps } from './selector';

class Screen_Details extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.name,
  });

  componentDidMount() {
    const id_collection = _.get(this.props, `navigation.state.params.id_collection`, void 0);
    this.props.dispatch_fetchDetails(id_collection);
  }

  render() {
    const id_collection = _.get(this.props, `navigation.state.params.id_collection`, void 0);
    const data = _.get(this.props, `res_collections.${id_collection}`, {
      'id': id_collection,
      'name': '?????',
      'description': '????????',
      'created_at': '??????',
      'updated_at': '?????????',
      'is_subscribed': false,
      'email_notification': false,
      'push_notification': false,
    });

    return (
      <View style={styles.headerStyle}>
        <View style={{width: '100%'}}>
          <Card>
            <Columns>
              <Text>
                Created On:
              </Text>
              <DateFormat date={data.created_at} />
            </Columns>

            <Columns>
              <Text>
                Last Updated:
              </Text>
              <DateFormat date={data.updated_at} />
            </Columns>
          </Card>
          <Card>
            <Columns>
              <Text style={{ fontSize: 20 }}>
                Notifications
              </Text>
              <Subscribe
                is_subscribed={data.is_subscribed}
                onPress={() => this.props.dispatch_toggleSubscribeCollections(id_collection)}
              />
            </Columns>
            <Columns>
              <Text>
                Email:
              </Text>
              <Text>
                {data.email_notification.toString().toUpperCase()}
              </Text>
            </Columns>

            <Columns>
              <Text>
                Push:
              </Text>
              <Text>
                {data.push_notification.toString().toUpperCase()}
              </Text>
            </Columns>
          </Card>
        </View>
      </View>
    );
  }
}

Screen_Details.propTypes = {
  dispatch_toggleSubscribeCollections: func.isRequired,
  dispatch_fetchDetails: func.isRequired,
};


export default connect(mapStoreToProps, mapDispatchToProps)(Screen_Details);
