import React from 'react';
import { connect } from 'react-redux';
import { Animated, SectionList, Text, View, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { func, number, bool, string, object, arrayOf } from 'prop-types';

import navIndex from '../../common/navIndex';
import CollectionItem from '../../components/collectionItem/';
import Spinner from '../../components/spinner/';
import Card from '../../components/card/';

import { mapStoreToProps, mapDispatchToProps } from './selector';

const Action_navigateToRoute = (routeName, params) => {
  return NavigationActions.navigate({ routeName, params });
};

class Screen_Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(0),
    };

    this.map_collections = this.map_collections.bind(this);
    this.render_collections = this.render_collections.bind(this);
  }

  componentDidMount() {
    this.props.dispatch_fetchCollections_subscribed();
  }

  componentDidUpdate(prevProps) {
    const navStackIndex_prev = prevProps.navStackIndex;
    const navStackIndex_next = this.props.navStackIndex;

    const navTabIndex_prev = prevProps.navTab;
    const navTabIndex_next = this.props.navTab;

    if (
      navStackIndex_prev === navIndex.STACK_DETAILS_SCREEN &&
      navStackIndex_next === navIndex.STACK_TAB_SCREEN &&
      navTabIndex_next === navIndex.TAB_SCREEN_DASHBOARD
    ) {
      this.props.dispatch_fetchCollections_subscribed();
    }

    if (
      navTabIndex_prev !== navIndex.TAB_SCREEN_DASHBOARD &&
      navTabIndex_next === navIndex.TAB_SCREEN_DASHBOARD
    ) {
      // this.props.dispatch_init();
      this.props.dispatch_fetchCollections_subscribed();
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
    const HEADER_MAX_HEIGHT = 200;
    const HEADER_MIN_HEIGHT = 60;
    const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });

    const headerText = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [35, 20],
      extrapolate: 'clamp',
    });

    const imageWidth = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [150, 75],
      extrapolate: 'clamp',
    });

    const imageRadius = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [75, 37.5],
      extrapolate: 'clamp',
    });

    const data = this.props.isLoading ?
      (<View style={{ paddingTop: 50 }}>
        <Spinner size="large" />
      </View>)
    :
      (<SectionList
        sections={[{ data: this.map_collections() }]}
        renderItem={item => this.render_collections(item)}
        keyExtractor={item => item.id}
        refreshing={this.props.isLoading}
        onRefresh={this.props.dispatch_fetchCollections_subscribed}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
        )}
        ListEmptyComponent={(<Card>
          <Text>You {'aren\'t'} subscribed to any collections!</Text>
        </Card>)}
        ListHeaderComponent={(<View
          style={{ height: HEADER_MAX_HEIGHT }}
        />)}
      />);

    return (
      <View>
        <Text>
          {this.props.httpError}
        </Text>
        <Animated.View style={{ zIndex: 3, position: 'absolute', width: '100%', top: 0, overflow: 'hidden', height: headerHeight }}>
          <Card>
            <View style={{ height: '100%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
              <Animated.Image
                style={{ width: imageWidth, height: imageWidth, borderRadius: imageRadius }}
                source={{ uri: 'https://www.davidli.io/img/profile.jpg' }}
                resizeMode="cover"
              />
              <Animated.Text style={{ fontSize: headerText }}>
                {this.props.user.full_name}
              </Animated.Text>
            </View>
          </Card>
        </Animated.View>
        <Animated.View style={{ zIndex: -5, paddingBottom: 5 }}>
          {data}
        </Animated.View>
      </View>
    );
  }
}

Screen_Dashboard.propTypes = {
  navTab: number.isRequired,
  navStackIndex: number.isRequired,
  ids_collection: arrayOf(number),
  res_collections: object,
  isLoading: bool.isRequired,
  user: object,
  navigation: object.isRequired,
  httpError: string,
  dispatch_fetchCollections_subscribed: func.isRequired,
  dispatch_toggleSubscribeCollections: func.isRequired,
};

Screen_Dashboard.defaultProps = {
  ids_collection: [],
  res_collections: {},
  user: {},
  httpError: '',
};

export default connect(mapStoreToProps, mapDispatchToProps)(Screen_Dashboard);
