// @flow

import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
} from 'react-native';
// $FlowFixMe
import Login from './LoginContainer';

export default class LoginScreen extends React.Component<*, *> {
    static navigationOptions = {
        header: null,
    };

    handleLogin = () => {
        const { navigate } = this.props.navigation;
        navigate('Main');
    };

    render() {
        return <Login onLogin={this.handleLogin} />;
    }
}
