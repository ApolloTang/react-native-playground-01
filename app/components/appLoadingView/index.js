import React from 'react';
import { Text, View } from 'react-native';

import styles from 'playground01/app/common/globalStyles';
import Spinner from '../spinner/';

const AppLoadingView = () => (
  <View style={{height: '100%', flexDirection: 'column', justifyContent: 'space-around'}}>
    <View style={{height: 300, flexDirection: 'column', justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10}}>
      <View style={{...styles.headerStyle}}>
        <Text style={{fontSize: 20}}>
           ... loading app
        </Text>
      </View>
      <View style={{paddingTop: 50}}>
        <Spinner size="large"/>
      </View>
    </View>
  </View>
);

export default AppLoadingView;
