import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { bool, func } from 'prop-types';

import Spinner from '../spinner';

const Subscribe = ({ is_subscribed, is_loading, onPress }) => {
  if (is_loading){
    return <Spinner size="small"/>;
  }

  return (
    <TouchableOpacity 
      style={{padding: 10, paddingRight: 0}}
      onPress={onPress}
    >
      <Text style={{color: is_subscribed ? 'red' : 'blue'}}>
        {is_subscribed ? 'Unsubscribe' : 'Subscribe'}
      </Text>
    </TouchableOpacity>
  );
}

Subscribe.propTypes = {
  is_subscribed: bool.isRequired,
  is_loading: bool,
  onPress: func.isRequired,
}

export default Subscribe;
