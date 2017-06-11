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
*/
/////////////////////////////////////////
const styles = StyleSheet.create({
    list: {
        flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start'
    },
    item: {
        backgroundColor: 'red',
        margin: 3,
        width: 100,
        height: 100
    }
});


const myData = void 0;
// Create Data (Start)
(function(){
  const data = [];
  [1,2,3].forEach(i=>{
    i--;
    const a = [];

    const length = 10;
    const start = length*i + 1
    const end = start + length - 1

    let count = length
    while (count) {
      const index = end - count + 1
      a.push({id:index})
      count--;
    }

    data[i] = a;
  })

  console.log('xxxxxx data, data', data)
  myData = data;
})()
// Create Data (End)


@connect(mapStoreToProps, mapDispatchToProps)
class Screen_04 extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this._data = myData[0]
    this.state = {
      dataSource: ds.cloneWithRows(this._data),
    }
  }

  componentDidMount() { }

  componentDidUpdate(prevProps) { }

  handle_press1 = (dataSet)=>{
    this._data = this._data.concat(myData[dataSet]);
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this._data)
    });
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={()=>this.handle_press1(2)}>
          <Text>Add dataSet 2</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.handle_press1(1)}>
          <Text>Add dataSet 1</Text>
        </TouchableOpacity>

        <ListView contentContainerStyle={styles.list}
          dataSource={this.state.dataSource}
          initialListSize={20}
          renderRow={
            (rowData, i) => {
              console.log(i, rowData)
              return <Text key={i} style={styles.item}>{rowData.id}</Text>
            }
          }
        />
      </View>
    );
  }
}

export default Screen_04;
