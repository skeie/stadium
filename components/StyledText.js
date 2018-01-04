// @flow

import { Text, StyleSheet } from 'react-native';
import * as React from 'react';

const styles = StyleSheet.create({
    style: { color: '#553555', fontFamily: 'poppins' },
    header: { color: '#553555', fontSize: 20, fontFamily: 'poppins' },
});

type MonoProps = {
    style?: number | Object,
};

type Type = 'style' | 'header';

type PoppinsProps = MonoProps & {
    children: React.Node,
    type?: Type,
    style?: number | Object,
};

export const MonoText = (props: MonoProps) => {
    return <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />;
};

export const Poppins = (props: PoppinsProps) => {
    const { children } = props;
    return (
        <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            {...props}
            style={[styles.style, props.type && styles[props.type], props.style]}>
            {children}
        </Text>
    );
};
