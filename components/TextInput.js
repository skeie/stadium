// @flow

import React from 'react';
import { TextInput } from 'react-native';
import { styles } from './StyledText';
import colors from '../constants/Colors';

type Props = any; // https://facebook.github.io/react-native/docs/textinput.html

const Input = (props: Props) => {
  return (
    <TextInput
      autoGrow
      underlineColorAndroid="transparent"
      placeholderTextColor={colors.placeholder}
      {...props}
      style={[styles.style, props.type && styles[props.type], props.style]}
    />
  );
};

export default Input;
