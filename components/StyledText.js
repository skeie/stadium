// @flow

import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';

export class MonoText extends Component {
    render() {
        return <Text {...this.props} style={[this.props.style, { fontFamily: 'space-mono' }]} />;
    }
}

const styles = StyleSheet.create({
    style: { color: '#553555', fontFamily: 'poppins' },
    header: { color: '#553555', fontSize: 20, fontFamily: 'poppins' },
});

export class Poppins extends Component {
    render() {
        const { style = {}, type = null } = this.props;
        return (
            <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                {...this.props}
                style={[styles.style, type && styles[type], style]}>
                {this.props.children}
            </Text>
        );
    }
}
