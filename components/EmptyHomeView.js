// @flow

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Poppins } from '../components/StyledText';
import colors from '../constants/Colors';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    height: '100%',
  },
});

const Homescreen = () => {
  return (
    <View style={styles.container}>
      <Poppins style={{ marginBottom: 20 }} type="header">
        Welcome to Stadiumz!
      </Poppins>
      <Poppins style={{ marginBottom: 20, textAlign: 'left', width: '100%' }}>
        • An app that helps you keep track of the football matches you have attended
      </Poppins>
      <Poppins>
        • Press on the plus icon in the down right corner to start and select a photo of football
        stadiums and see the magic happen
      </Poppins>
    </View>
  );
};

export default Homescreen;
