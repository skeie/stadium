// @flow

import React from 'react';
import { View, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { Poppins } from '../components/StyledText';
import Button from '../components/Button';
import colors from '../constants/Colors';

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    padding: 20,
  },
});

type Props = {
  toggleModal: () => *,
  isVisible: boolean,
};

function NoMetaData({ toggleModal, isVisible }: Props) {
  return (
    <Modal isVisible={isVisible} onBackdropPress={toggleModal}>
      <View style={styles.modalContainer}>
        <Poppins style={{ marginBottom: 20, textAlign: 'center' }} type="header">
          Sorry!
        </Poppins>
        <Poppins style={{ width: '100%', textAlign: 'center', marginBottom: 20 }}>
          We did not find anything with that image
        </Poppins>
        <Button onPress={toggleModal}>Try again</Button>
      </View>
    </Modal>
  );
}

export default NoMetaData;
