// @flow
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Poppins } from './StyledText';
import { FontAwesome } from '@expo/vector-icons';

type Props = {
  onGoToProfile?: () => *,
  user?: {
    name: string,
  },
};

function User({ user, onGoToProfile }: Props) {
  if (!user) return null;
  return (
    <TouchableOpacity onPress={onGoToProfile}>
      <View flexDirection="row" alignItems="center" marginLeft={7}>
        <FontAwesome name="user-circle-o" size={25} />
        <View marginRight={5} />
        <Poppins>{user.name}</Poppins>
      </View>
    </TouchableOpacity>
  );
}

export default User;
