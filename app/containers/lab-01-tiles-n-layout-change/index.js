import React from 'react';
import { connect } from 'react-redux';

import { NavigationActions } from 'react-navigation';
const Action_navigateToRoute = (routeName, params) => {
  return NavigationActions.navigate({ routeName, params });
};

import {
  Text,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';

import { func, number, bool, string, object, arrayOf } from 'prop-types';

import { mapStoreToProps, mapDispatchToProps } from './selector';

/////////////////////////////////////////
// ref:
// https://medium.com/@emilios1995/implementing-a-tile-view-in-react-native-a-la-ios-12f94c084f4b

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
     justifyContent: "flex-start", flexDirection: "row", flexWrap: "wrap", marginTop: 30
  },
  item: {
    backgroundColor: 'yellow',
     alignSelf: "flex-start",
     alignItems: 'center',
     justifyContent: 'center',
     marginBottom: 20
  },
  itemText: {
    fontSize: 20
  }
});

const calcTileDimensions = (deviceWidth, tpr) => {
  const margin = deviceWidth / (tpr * 10);
  const size = (deviceWidth - margin * (tpr * 2)) / tpr;
  return { size, margin };
};

const Item = ({size, margin, text}) => (
  <View style={[styles.item, {width: size, height: size, marginHorizontal: margin}]}>
    <Text style={styles.itemText}>{text}</Text>
  </View>
);


class Lab extends React.Component {
  _onLayout = e => {
    const ne_layout = e.nativeEvent.layout;
    console.log('yyyyyy layout change width: ', width, ne_layout)
  }
  render() {
    const tileDimensions = calcTileDimensions(width, 2)  // -> change this number and see!
    const tiles = 'Lorem Ipsum Dolor Sit Amet'.split(' ')
    return (
      <View
        onLayout={this._onLayout}
        style={styles.container}
        >
        {tiles.map(i => Item({...tileDimensions, text: i}))}
      </View>
    );
  }
}



////////////////////////////////////////

@connect(mapStoreToProps, mapDispatchToProps)
class Screen_Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }
  _onLayout = e => {
    const ne_layout = e.nativeEvent.layout;
    console.log('yyyyyy layout change width: ', width, ne_layout)
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps) {
  }

  render() {
    console.log('xxxxxx this.props: ', this.props)
    return (
      <View
        onLayout={this._onLayout}
        >
        <Lab />
      </View>
    );

    // return (
    //   <View>
    //     <Text>
    //       hello world
    //     </Text>
    //   </View>
    // );
  }
}

Screen_Dashboard.defaultProps = {
};

// export default connect(mapStoreToProps, mapDispatchToProps)(Screen_Dashboard);
export default Screen_Dashboard;
