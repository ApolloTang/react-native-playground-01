import React from 'react';
import { View } from 'react-native';
import { arrayOf, element } from 'prop-types';

const Columns = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.column1}>
        {props.children[0]}
      </View>
      <View style={styles.column2}>
        {props.children[1]}
      </View>
    </View>
  );
};

Columns.propTypes = {
  children: arrayOf(element).isRequired,
};

const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  column1: {
    
  },
  column2: {

  },
};

export default Columns;
