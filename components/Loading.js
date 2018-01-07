/*
* @flow
*/

import React, { Component } from 'react';
import { View, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Poppins } from './StyledText';

type State = {
    animated: Animated.Value,
};

class Loading extends Component<*, State> {
    state = {
        animated: new Animated.Value(0),
    };
    componentDidMount() {
        this.startAnimation();
    }

    startAnimation = () => {
        Animated.timing(this.state.animated, {
            duration: 1000,
            toValue: 1,
            useNativeDriver: true,
        }).start(() => {
            this.setState(
                () => ({
                    animated: new Animated.Value(0),
                }),
                this.startAnimation,
            );
        });
    };

    render() {
        const interpolation = this.state.animated.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg'],
        });
        const imageStyle = {
            backgroundColor: 'transparent',
            transform: [
                {
                    rotate: interpolation,
                },
            ],
        };

        return (
            <View>
                <Animated.View style={imageStyle}>
                    <MaterialCommunityIcons name="stadium" size={64} color="#553555" />
                </Animated.View>
                <Poppins>Loading</Poppins>
            </View>
        );
    }
}
export default Loading;
