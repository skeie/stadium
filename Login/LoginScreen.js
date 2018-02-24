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
import { ImagePicker, Location, Permissions } from 'expo';
import Login from './LoginContainer';

export default class LoginScreen extends React.Component<*, *> {
    handleLogin = () => {
        const { navigate } = this.props.navigation;
        navigate('MainTabNavigator');
    };

    render() {
        return <Login onLogin={this.handleLogin} />;
    }
}
