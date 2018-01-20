// @flow

import React, { Component } from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

import { MonoText, Poppins } from '../components/StyledText';
import colors from '../constants/Colors';
import { get } from '../api/fetch';

type Footballclub = {
    capacity: string,
    name: string,
    stadiumName: string,
};

type FootballclubResult = Array<Footballclub>;

type State = {
    footballclubResult?: FootballclubResult,
    text: string,
};

type Props = {
    uri: string,
    date: string,
};

class SearchClub extends Component<Props, State> {
    timeout: number;

    onHandleTextInput = (text: string) => {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(async () => {
            const footballclubResult = await get('/football/footballclub', {
                clubname: text,
            });
            this.setState({
                footballclubResult,
            });
        }, 600);

        this.setState({ text });
    };

    handleClubSelect = async (club: Footballclub) => {
        const that = this;
        const resultdata = await get('/football/searchResult', { ...club, date: this.date });
        resultdata.uri = this.props.uri;
        resultdata.date = this.props.date;
    };

    render() {
        return (
            <Modal isVisible>
                <View style={styles.modalContainer}>
                    <Poppins style={{ marginBottom: 20 }} type="header">
                        Oops, we could't not find anything with that picture, sorry :-(
                    </Poppins>
                    <Poppins style={{ width: '100%' }}>
                        Please fill out the football club name below to proceed
                    </Poppins>
                    <TextInput
                        width="100%"
                        height={50}
                        autoFocus
                        placeholder="Football stadium name"
                        value={this.state.text}
                        onChangeText={this.onHandleTextInput}
                    />

                    <Poppins width="100%" type="subHeader">
                        Result:
                    </Poppins>

                    {this.state.footballclubResult &&
                        this.state.footballclubResult.map(result => (
                            <TouchableOpacity
                                activeOpacity={0.6}
                                style={{ width: '100%' }}
                                key={result.name}
                                onPress={() => {
                                    this.handleClubSelect(result);
                                }}>
                                <View
                                    flexDirection="row"
                                    alignItems="center"
                                    width="100%"
                                    justifyContent="space-between">
                                    <View marginVertical={10} width="60%">
                                        <View flexDirection="row">
                                            <Poppins type="bold">Club: </Poppins>
                                            <Poppins>{result.name}</Poppins>
                                        </View>
                                        <View flexDirection="row">
                                            <Poppins type="bold">Stadium: </Poppins>
                                            <Poppins numberOfLines={1}>
                                                {result.stadiumName}
                                            </Poppins>
                                        </View>
                                    </View>
                                    <Poppins
                                        style={{
                                            borderRadius: 5,
                                            padding: 2,
                                            borderWidth: 1,
                                            borderColor: colors.primaryText,
                                        }}>
                                        Select
                                    </Poppins>
                                </View>
                            </TouchableOpacity>
                        ))}
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
        padding: 20,
    },
});

export default SearchClub;
