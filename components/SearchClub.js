// @flow
import React from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { MonoText, Poppins } from './StyledText';
import colors from '../constants/Colors';
import Loading from './Loading';

const styles = StyleSheet.create({
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
        padding: 20,
    },
});

type Footballclub = {
    capacity: string,
    name: string,
    stadiumName: string,
};

type FootballclubResult = Array<Footballclub>;

type Props = {
    isVisible: boolean,
    text: string,
    onHandleTextInput: (text: string) => void,
    getMatchData: (club: Footballclub) => void,
    footballclubResult?: FootballclubResult,
    fetching?: boolean,
    toggleModal: () => void,
};

const SearchClub = ({
    isVisible,
    onHandleTextInput,
    footballclubResult = [],
    getMatchData,
    fetching,
    toggleModal,
}: Props) => {
    return (
        <Modal isVisible={isVisible} onBackdropPress={toggleModal}>
            <View style={styles.modalContainer}>
                <Poppins style={{ marginBottom: 20 }} type="header">
                    Oops, we could't not find anything with that picture :-(
                </Poppins>
                <Poppins style={{ width: '100%' }}>
                    Please search and then select the home team in the picture you choose.
                </Poppins>
                <TextInput
                    width="100%"
                    height={50}
                    autoFocus
                    placeholder="Football stadium name"
                    onChangeText={onHandleTextInput}
                />

                <Poppins width="100%" type="subHeader">
                    Result:
                </Poppins>
                {fetching && <Loading />}
                {footballclubResult && (
                    <ScrollView style={{ width: '100%' }}>
                        {footballclubResult.map(result => (
                            <TouchableOpacity
                                activeOpacity={0.6}
                                key={result.name}
                                onPress={() => {
                                    getMatchData(result);
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
                    </ScrollView>
                )}
            </View>
        </Modal>
    );
};

export default SearchClub;
