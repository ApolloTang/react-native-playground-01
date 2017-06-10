import React from 'react';
import { View, TextInput, Text } from 'react-native';
import { string, func, bool } from 'prop-types';

import styles from './styles';

const Input = ({ value, onChangeText, label, placeholder, autoCorrect, secureTextEntry }) => {
  const { containerStyle, labelStyle, inputStyle } = styles;

  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        autoCorrect={autoCorrect}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

Input.propTypes = {
  label: string,
  value: string.isRequired,
  onChangeText: func.isRequired,
  placeholder: string,
  autoCorrect: bool,
  secureTextEntry: bool,
};

Input.defaultProps = {
  label: '',
  placeholder: '',
  autoCorrect: true,
  secureTextEntry: false,
};

export default Input;
