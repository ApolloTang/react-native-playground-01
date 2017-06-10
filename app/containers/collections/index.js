import React from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { func, number, bool, string, object, arrayOf } from 'prop-types';

import navIndex from '../../common/navIndex';
import CollectionItem from '../../components/collectionItem/';
import Spinner from '../../components/spinner/';
import { mapStoreToProps, mapDispatchToProps } from './selector';

const Action_navigateToRoute = (routeName, params) => {
  return NavigationActions.navigate({ routeName, params });
};

class Screen_Collections extends React.Component {
  constructor(props) {
    super(props);

    this.map_collections = this.map_collections.bind(this);
    this.render_collections = this.render_collections.bind(this);
  }

  componentDidUpdate(prevProps) {
    const navStackIndex_prev = prevProps.navStackIndex;
    const navStackIndex_next = this.props.navStackIndex;

    const navTabIndex_prev = prevProps.navTab;
    const navTabIndex_next = this.props.navTab;

    if (
      navStackIndex_prev === navIndex.STACK_DETAILS_SCREEN &&
      navStackIndex_next === navIndex.STACK_TAB_SCREEN &&
      navTabIndex_next === navIndex.TAB_SCREEN_COLLECTION
    ) {
      this.props.dispatch_fetchCollections();
    }

    if (
      navTabIndex_prev !== navIndex.TAB_SCREEN_COLLECTION &&
      navTabIndex_next === navIndex.TAB_SCREEN_COLLECTION
    ) {
      this.props.dispatch_fetchCollections();
    }
  }

  map_collections() {
    return (this.props.ids_collection.map(
        (id => this.props.res_collections[id]),
      ));
  }

  render_collections({ item }) {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.dispatch(
            Action_navigateToRoute('Details',
              {
                id_collection: item.id,
                name: item.name,
              },
            ),
          );
        }}
      >
        <CollectionItem
          collection={item}
          dispatch_toggleSubscribeCollections={this.props.dispatch_toggleSubscribeCollections}
        />
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={{ paddingBottom: 5 }}>
        <Text>
          {this.props.httpError}
        </Text>
        {
          this.props.isLoading
          ?
            <View style={{ paddingTop: 50 }}>
              <Spinner size="large" />
            </View>
          :
            <FlatList
              data={this.map_collections()}
              renderItem={item => this.render_collections(item)}
              keyExtractor={item => item.id}
              refreshing={this.props.isLoading}
              onRefresh={this.props.dispatch_fetchCollections}
            />
        }
      </View>
    );
  }
}

Screen_Collections.propTypes = {
  navTab: number.isRequired,
  navStackIndex: number.isRequired,
  ids_collection: arrayOf(number),
  res_collections: object,
  isLoading: bool.isRequired,
  dispatch_fetchCollections: func.isRequired,
  dispatch_toggleSubscribeCollections: func.isRequired,
  httpError: string,
  navigation: object.isRequired,
};

Screen_Collections.defaultProps = {
  ids_collection: [],
  res_collections: {},
  httpError: '',
};

export default connect(mapStoreToProps, mapDispatchToProps)(Screen_Collections);
