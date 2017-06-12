import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Animated, SectionList, Text, View, TouchableOpacity,
  StyleSheet,
  FlatList,
  ListView,
  ActivityIndicator
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
  https://medium.com/react-native-development/how-to-use-the-flatlist-component-react-native-basics-92c482816fe6
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
        width: 50,
        height: 50
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
class Screen_05 extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this._data = myData[0]
    this.state = {
      dataSource: ds.cloneWithRows(this._data),
      data4FlatList: myData[0]
    }
  }

  componentDidMount() { }

  componentDidUpdate(prevProps) { }

  handle_ListViewAddData = (dataSet)=>{
    this._data = this._data.concat(myData[dataSet]);
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this._data),
      data4FlatList: _.uniqBy( // uniqBy is need because flat will not take duplicated id
        this.state.data4FlatList.concat(myData[dataSet]),'id'
      )
    });
  }

  render() {
    console.log('xxxxx this._dtat: ', this._data)
    return (
      <View style={{flex:1}}>
        <View style={{ flex:3, borderWidth:1, borderColor:'red'}}>
          <FlatList
            contentContainerStyle={styles.list}
            keyExtractor={item => item.id}
            data={this.state.data4FlatList}
            renderItem={({item}) => {
                return <Text  style={styles.item}>{item.id}</Text>
            }}
          />
        </View>
        <View style={{ flex:1, borderWidth:1, borderColor:'red'}}>
          <TouchableOpacity onPress={()=>this.handle_ListViewAddData(2)}>
            <Text>Add dataSet 2</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.handle_ListViewAddData(1)}>
            <Text>Add dataSet 1</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex:3, borderWidth:1, borderColor:'red'}}>
        <ListView contentContainerStyle={styles.list}
          dataSource={this.state.dataSource}
          initialListSize={20}
          renderRow={
            (rowData, i) => {
              return <Text key={i} style={styles.item}>{rowData.id}</Text>
            }
          }
        />
        </View>
      </View>
    );
  }
}

export default Screen_05;
