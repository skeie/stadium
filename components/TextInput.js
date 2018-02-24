// @flow

import React from 'react';
import { TextInput } from 'react-native';
import { styles } from './StyledText';

type Props = any; // https://facebook.github.io/react-native/docs/textinput.html

const Input = (props: Props) => {
    return (
        <TextInput
            {...props}
            style={[styles.style, props.type && styles[props.type], props.style]}
        />
    );
};

export default Input;
