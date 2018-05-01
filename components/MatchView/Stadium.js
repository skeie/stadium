// @flow
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Poppins } from '../StyledText';
import { Entypo } from '@expo/vector-icons';

type Props = {
  capacity: number,
  date: string,
  name: string,
  homeTeam: string,
  onChangeStadium?: () => *,
};

function Stadium(props: Props) {
  //
  return (
    <View>
      <TouchableOpacity onPress={props.onChangeStadium} style={{ flexDirection: 'row' }}>
        <Entypo name="location-pin" size={25} color="#553555" />
        <View style={{ borderBottomColor: '#553555', borderBottomWidth: props.editable ? 1 : 0 }}>
          <Poppins style={{ marginLeft: 2 }} type="header">
            {props.name}
          </Poppins>
        </View>
      </TouchableOpacity>
      <View marginLeft={27} marginRight={5}>
        <View flexDirection="row" alignItems="center" justifyContent="space-between">
          <Poppins>Capacity: {props.capacity}</Poppins>
          <Poppins>{props.date}</Poppins>
        </View>
        {!props.editable && (
          <View flexDirection="row">
            <Poppins>Home team: {props.homeTeam}</Poppins>
          </View>
        )}
      </View>
    </View>
  );
}

export default Stadium;
