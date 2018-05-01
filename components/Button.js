import React from 'react';
import {
  TouchableOpacity,
  ScrollView,
  View,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { Poppins } from './StyledText';

type Props = {
  style: any,
  onPress: () => void,
  children: string,
  loading?: boolean,
};

const Button = ({ style, onPress, children, loading = false }) => {
  return (
    <TouchableOpacity
      onPress={loading ? () => {} : onPress}
      style={{
        borderColor: '#553555',
        borderWidth: 1,
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        ...style,
      }}
    >
      {loading ? <ActivityIndicator color="#553555" /> : <Poppins>{children}</Poppins>}
    </TouchableOpacity>
  );
};

export default Button;
