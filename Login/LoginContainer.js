// @flow

import React, { Component } from 'react';
import { LayoutAnimation } from 'react-native';
import { login, signup } from './LoginGQL';
import layout from '../constants/Layout';
import Login from './LoginComponents';
// $FlowFixMe
import { graphql, compose } from 'react-apollo';
import { onSignIn } from '../util/auth';
type State = {
    username: string,
    password: string,
    isSignup: boolean,
    email: string,
    error: string,
};

class LoginContainer extends Component<*, State> {
    state = {
        username: '',
        password: '',
        email: '',
        isSignup: true,
        error: '',
    };

    handleInputChange = (name: string, value: string) => {
        this.setState({
            [name]: value,
        });
    };

    handleToggleSignup = () => {
        LayoutAnimation.configureNext(layout.customLayoutLinear);
        this.setState(({ isSignup }) => ({
            isSignup: !isSignup,
        }));
    };

    handleSignup = async () => {
        try {
            const { data } = await this.props.signup({
                variables: {
                    name: this.state.username,
                    password: this.state.password,
                    email: this.state.email,
                },
            });
            const { token } = data.signup;
            await onSignIn(token);
            this.props.onLogin();
        } catch (error) {
            console.log('error handleSignup', error);
            this.setState({
                error: 'A user with this email already exist, maybe its you? Try to login :)',
            });
        }
    };

    handleLogin = async () => {
        try {
            const { data } = await this.props.login({
                variables: {
                    email: this.state.email,
                    password: this.state.password,
                },
            });
            const { token } = data.login;
            await onSignIn(token);
            this.props.onLogin();
        } catch (error) {
            console.log('error handleSignup', error);
            this.setState({
                error: 'A user with this email already exist, maybe its you? Try to login :)',
            });
        }
    };

    handleButtonPressed = () => {
        this.state.isSignup ? this.handleSignup() : this.handleLogin();
    };

    render() {
        return (
            <Login
                {...this.state}
                onButtonPressed={this.handleButtonPressed}
                onInputChange={this.handleInputChange}
                onToggleSignup={this.handleToggleSignup}
            />
        );
    }
}

export default compose(
    graphql(login, {
        name: 'login',
    }),
    graphql(signup, {
        name: 'signup',
    }),
)(LoginContainer);
