// @flow

import React, { Component } from 'react';
import { LayoutAnimation } from 'react-native';
import { Connect, query, mutation } from 'urql';
import { login, signup } from './LoginGQL';
import layout from '../constants/Layout';
import Login from './LoginComponents';
type State = {
    username: string,
    password: string,
    isSignup: boolean,
    email: string,
};

class LoginContainer extends Component<*, State> {
    state = {
        username: '',
        password: '',
        email: '',
        isSignup: false,
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

    render() {
        return (
            <Connect
                mutation={{
                    login: mutation(login),
                    signup: mutation(signup),
                }}
                children={({ login, signup, ...rest }) => {
                    console.log('1337', rest);
                    return (
                        <Login
                            {...this.state}
                            onLogin={() => {
                                console.log('sapdpa', this.state);

                                login({
                                    name: this.state.username,
                                    password: this.state.password,
                                });
                            }}
                            onSignup={signup}
                            onInputChange={this.handleInputChange}
                            onToggleSignup={this.handleToggleSignup}
                        />
                    );
                }}
            />
        );
    }
}

export default LoginContainer;
