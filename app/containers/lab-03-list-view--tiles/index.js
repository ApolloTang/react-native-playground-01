import React from 'react';
import { connect } from 'react-redux';
import { Animated, SectionList, Text, View, TouchableOpacity,
  StyleSheet,
  ListView
} from 'react-native';
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

/////////////////////////////////////////
/*
 https://stackoverflow.com/questions/29394297/listview-grid-in-react-native?rq=1
 https://github.com/pavlelekic/react-native-gridview
 https://stackoverflow.com/questions/40706450/why-is-this-listview-only-showing-10-items


*////////////////////////////////////////
const styles = StyleSheet.create({
    list: {
        flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start'
    },
    item: {
        backgroundColor: 'red',
        margin: 3,
        width: 100
    }
});

@connect(mapStoreToProps, mapDispatchToProps)
class Screen_03 extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const data = Array.apply(null, {length: 30}).map(Number.call, Number);
    console.log(data)
    this.state = {
      dataSource: ds.cloneWithRows(data),
    }
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps) {
  }

  render() {
    console.log('xxxxxx this.props: ', this.props, this.state)
    return (
      <View>
        <Text>
          hello world
        </Text>
        <ListView contentContainerStyle={styles.list}
          dataSource={this.state.dataSource}
          initialListSize={50}
          renderRow={
            (rowData) => {
              console.log(rowData)
              return <Text style={styles.item}>{rowData}</Text>
            }
          }
        />
      </View>
    );
  }
}

Screen_03.defaultProps = {
};

// export default connect(mapStoreToProps, mapDispatchToProps)(Screen_Dashboard);
export default Screen_03;
