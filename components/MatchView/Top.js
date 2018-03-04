// @flow

import React, { Component } from 'react';
import { TouchableOpacity, ScrollView, View, Image, Dimensions, StyleSheet } from 'react-native';
import { Entypo, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Poppins } from '../StyledText';
import TextInput from '../TextInput';
import colors from '../../constants/Colors';

type Props = {
    name: string,
    capacity: number,
    homeTeam: string,
    date: string,
    onChangeHomeTeam: string => void,
    editable?: boolean,
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
                <View flexDirection="row">
                    <Entypo name="location-pin" size={25} color="#553555" />
                    <Poppins style={{ marginLeft: 2 }} type="header">
                        {this.props.name}
                    </Poppins>
                </View>
                <View marginLeft={27} marginRight={5}>
                    <View flexDirection="row" alignItems="center" justifyContent="space-between">
                        <Poppins>Capacity: {this.props.capacity}</Poppins>
                        <Poppins>{this.props.date}</Poppins>
                    </View>
                    {!this.props.editable && <Poppins>Home team: {this.props.homeTeam}</Poppins>}
                </View>
                {this.props.editable &&
                    <TouchableOpacity
                        onPress={this.changeHome}
                        style={{
                            marginLeft: 5,
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                        <MaterialIcons size={15} name={this.state.isHomeEdit ? 'save' : 'edit'} />
                        <View marginRight={8} />
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
                                <Poppins>Home team: {this.props.homeTeam}</Poppins>
                            )}
                    </TouchableOpacity>
                }
            </View>
        );
    }
}

export default Top;
