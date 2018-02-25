// @flow

import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import TextInput from '../components/TextInput';
import { Poppins } from '../components/StyledText';
import colors from '../constants/Colors';
import Button from '../components/Button';

const loginText = "Don't have an account? Click here to Signup!";
const signupText = 'Already have an account? Click here to login';

const styles = StyleSheet.create({
    textInput: {
        padding: 10,
        width: '50%',
        borderWidth: 1,
        borderColor: colors.primaryText,
        borderRadius: 10,
    },
});

type Props = {
    isSignup: boolean,
    email: string,
    onInputChange: (string, string) => void,
    username: string,
    password: string,
    onToggleSignup: () => void,
    onButtonPressed: () => void,
    error: string,
};

const LoginComponent = (props: Props) => {
    return (
        <View flex={1} style={{ backgroundColor: colors.primary }}>
            <View justifyContent="center" alignItems="center" flex={1}>
                <MaterialCommunityIcons name="stadium" size={64} color={colors.primaryText} />
                <Poppins type="header">Welcome to Stadiumz</Poppins>
            </View>
            <View flex={1} justifyContent="flex-start" alignItems="center">
                {props.isSignup && (
                    <TextInput
                        spellCheck={false}
                        placeholder="Username"
                        name="username"
                        autoFocus
                        value={props.username}
                        style={styles.textInput}
                        onChangeText={text => {
                            props.onInputChange('username', text);
                        }}
                    />
                )}
                <View padding={5} />
                <TextInput
                    spellCheck={false}
                    value={props.email}
                    style={styles.textInput}
                    placeholder="Email"
                    autoFocus={!props.isSignup}
                    onChangeText={text => {
                        props.onInputChange('email', text);
                    }}
                />
                <View padding={5} />
                <TextInput
                    spellCheck={false}
                    secureTextEntry
                    onChangeText={text => {
                        props.onInputChange('password', text);
                    }}
                    value={props.password}
                    style={styles.textInput}
                    placeholder="Password"
                />
                <View padding={15} />
                <Button style={{ width: '50%' }} onPress={props.onButtonPressed}>
                    {props.isSignup ? 'Signup' : 'Login'}
                </Button>
                <View padding={5} />
                <TouchableOpacity onPress={props.onToggleSignup}>
                    <Poppins>{props.isSignup ? signupText : loginText}</Poppins>
                </TouchableOpacity>
                <View padding={15}>
                    <Poppins type="error">{props.error}</Poppins>
                </View>
            </View>
        </View>
    );
};

export default LoginComponent;
