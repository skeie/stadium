import React from 'react';
import { TouchableOpacity, ScrollView, View, Image, Dimensions } from 'react-native';
import { Poppins } from './StyledText';

type Props = {
    style: any,
    onPress: () => void,
    children: string,
};

const Button = ({ style, onPress, children }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                borderColor: '#553555',
                borderWidth: 1,
                alignItems: 'center',
                padding: 10,
                borderRadius: 10,
                marginBottom: 10,
                ...style,
            }}>
            <Poppins>{children}</Poppins>
        </TouchableOpacity>
    );
};

export default Button;
