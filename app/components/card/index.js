import React from 'react';
import { View } from 'react-native';
import { oneOfType, element, array } from 'prop-types';

import styles from './styles';

const Card = (props) => {
  const { containerStyle } = styles;

  return (
    <View style={containerStyle}>
      {props.children}
    </View>
  );
};

Card.propTypes = {
  children: oneOfType([
    element,
    array,
  ]).isRequired,
};

export default Card;
