// @flow
import React from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { MonoText, Poppins } from '../components/StyledText';
import colors from '../constants/Colors';
import Loading from '../components/Loading';

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
  onHandleTextInput: (text: string) => *,
  getMatchData: (club: Footballclub) => *,
  footballclubResult: ?FootballclubResult,
  fetching?: boolean,
  toggleModal: () => void,
  title?: string,
  subTitle?: string,
};

const SearchClub = ({
  isVisible,
  onHandleTextInput,
  footballclubResult,
  getMatchData,
  fetching,
  toggleModal,
  title = 'Oops, there was a problem with that image',
  subTitle = 'Please search and then select the home team in the image.',
}: Props) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={toggleModal}>
      <View style={styles.modalContainer}>
        <Poppins style={{ marginBottom: 20 }} type="header">
          {title}
        </Poppins>
        <Poppins style={{ width: '100%' }}>{subTitle}</Poppins>
        <TextInput
          width="100%"
          height={50}
          autoFocus
          placeholder="Football club name"
          onChangeText={onHandleTextInput}
        />

        <Poppins width="100%" type="subHeader">
          Result:
        </Poppins>
        {fetching && (
          <View paddingVertical={20}>
            <Loading />
          </View>
        )}
        {footballclubResult && (
          <ScrollView style={{ width: '100%' }} keyboardShouldPersistTaps="handled">
            {footballclubResult.map((result, index) => (
              <TouchableOpacity
                activeOpacity={0.6}
                key={`${result.name}-${index}`}
                onPress={() => {
                  getMatchData(result);
                }}
              >
                <View
                  flexDirection="row"
                  alignItems="center"
                  width="100%"
                  justifyContent="space-between"
                >
                  <View marginVertical={10} width="60%">
                    <View flexDirection="row">
                      <Poppins type="bold">Club: </Poppins>
                      <Poppins>{result.name}</Poppins>
                    </View>
                    <View flexDirection="row">
                      <Poppins type="bold">Stadium: </Poppins>
                      <Poppins numberOfLines={1}>{result.stadiumName}</Poppins>
                    </View>
                  </View>
                  <Poppins
                    style={{
                      borderRadius: 5,
                      padding: 5,
                      borderWidth: 1,
                      borderColor: colors.primaryText,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
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
