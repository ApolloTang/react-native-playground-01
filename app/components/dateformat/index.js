import React from 'react';
import { View, Text } from 'react-native';
import { string } from 'prop-types';

const DateFormat = ({ date }) => {
  const dDate = new Date(date);
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const output = `${monthNames[dDate.getMonth()]} ${(dDate.getUTCDate())}, ${dDate.getFullYear()}`;
  return (
    <View>
      <Text>{date.toString()}</Text>
    </View>
  );
};

DateFormat.propTypes = {
  date: string.isRequired,
};

export default DateFormat;
