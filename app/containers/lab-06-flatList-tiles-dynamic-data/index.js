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
  https://www.youtube.com/watch?v=pHLFJs7jlI4
  https://www.youtube.com/watch?v=rY0braBBlgw
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


// -- Create Data -- //
const myData = void 0;
(function(){
  const data = [];
  [1,2,3].forEach(i=>{
    i--;
    const a = [];

    const length = 50;
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

  myData = data;
})()


// -- Mock fetch -- //
const fetchData = (page) => {
  console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx fetching page: ', page)
  return new Promise((rs, rj) => {
    const MAX_NUM_OF_PAGE = 3
    setTimeout(
      ()=>{
        if (page > MAX_NUM_OF_PAGE ) {
          rs([]);
        }
        rs(myData[page-1]);
      }, 1000
    )
  }).then( data => data )
};


@connect(mapStoreToProps, mapDispatchToProps)
class Screen_05 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
      isLoading: false,
      data4FlatList: []
    }
    this._currentPage = 0;
  }

  componentDidMount() {
    // const page = this._currentPage;
    // this.setState({
    //   isLoading: true,
    //   data4FlatList: []
    // });
    //
    // fetchData(page).then(
    //   data => {
    //     this.setState({
    //       data4FlatList: data,
    //       refreshing: false
    //     })
    //   }
    // )
  }

  handle_refresh = ()=>{
    this._currentPage = 1;
    this.setState({
      refreshing: true
    })
    fetchData(this._currentPage).then(
      data => {
        this.setState({
          data4FlatList: data,
          refreshing: false
        })
      }
    )
  }

  handle_onEndReached = ()=>{
    console.log('xxxxxxxxxxxxxxxxxx End reach')
    this._currentPage++
    this.setState({
      isLoading: true
    })

    fetchData(this._currentPage).then(
      data => {
        this.setState({
          data4FlatList: this.state.data4FlatList.concat(data),
          isLoading: false
        })
      }
    )
  }

  renderFooter = () => {
    if (!this.state.isLoading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }} >
        <Text>...loading</Text>
      </View>
    );
  };

  render() {
    console.log('xxxxx this.data4FlatList ', this.state.data4FlatList)
    return (
      <View style={{flex:1}}>
        <View style={{ flex:3, borderWidth:1, borderColor:'red'}}>
          <FlatList
            contentContainerStyle={styles.list}
            keyExtractor={item => item.id}
            data={this.state.data4FlatList}
            renderItem={({item}) => { return <Text  style={styles.item}>{item.id}</Text> }}
            refreshing={this.state.refreshing}
            onRefresh={this.handle_refresh}
            onEndReached={this.handle_onEndReached}
            onEndThreshold={0}
            ListFooterComponent={this.renderFooter}
          />
        </View>
        <View style={{ flex:3, borderWidth:1, borderColor:'red'}}>
        </View>
      </View>
    );
  }
}

export default Screen_05;
