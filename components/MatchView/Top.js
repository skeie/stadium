// @flow

import React, { Component } from 'react';
import { TouchableOpacity, ScrollView, View, Image, Dimensions, StyleSheet } from 'react-native';
import { Entypo, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Poppins } from '../StyledText';
import TextInput from '../TextInput';
import colors from '../../constants/Colors';
import Stadium from './Stadium';

type Props = {
  name: string,
  capacity: number,
  homeTeam: string,
  date: string,
  onChangeHomeTeam: string => void,
  editable?: boolean,
  onChangeStadium?: () => *,
};

const styles = StyleSheet.create({
  textInput: {
    width: '50%',
  },
});

class Top extends Component<Props, *> {
  state = {
    isHomeEdit: false,
  };

  changeEdit = (property: string) => () => {
    this.setState(state => ({
      ...state,
      isHomeEdit: !state.isHomeEdit,
    }));
  };

  changeHome = this.changeEdit('isHomeEdit');

  render() {
    return (
      <View flexDirection="column" padding={5} justifyContent="space-around" minHeight="10%">
        <Stadium {...this.props} />
        {this.props.editable && (
          <TouchableOpacity
            onPress={this.changeHome}
            style={{
              marginLeft: 5,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            {this.state.isHomeEdit ? (
              <TextInput
                spellCheck={false}
                placeholder="hometeam"
                autoFocus
                value={this.props.homeTeam}
                style={styles.textInput}
                onChangeText={this.props.onChangeHomeTeam}
              />
            ) : (
              <View style={{ borderBottomColor: '#553555', borderBottomWidth: 1 }}>
                <Poppins>Home team: {this.props.homeTeam}</Poppins>
              </View>
            )}
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

export default Top;
