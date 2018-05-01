// @flow
import React from 'react';
import { View } from 'react-native';
import { Poppins } from './StyledText';
import { FontAwesome } from '@expo/vector-icons';

type Props = {
  user?: {
    name: string,
  },
};

function User({ user }: Props) {
  if (!user) return null;
  return (
    <View flexDirection="row" alignItems="center" marginLeft={7}>
      <FontAwesome name="user-circle-o" size={25} />
      <View marginRight={5} />
      <Poppins>{user.name}</Poppins>
    </View>
  );
}

export default User;
