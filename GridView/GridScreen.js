// @flow

import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
// $FlowFixMe
import { ImagePicker, Location, Permissions } from 'expo';
import _get from 'lodash/get';
import { MaterialIcons } from '@expo/vector-icons';
import { MonoText, Poppins } from '../components/StyledText';
import { get } from '../api/fetch';
import colors from '../constants/Colors';
import Loading from '../components/Loading';
import GridContainer from './GridContainer';

export default class GridScreen extends React.Component<*, *> {
  static navigationOptions = {
    header: null,
  };

  onHandleGoToPhoto = () => {
    const { navigate } = this.props.navigation;
    navigate('Photo');
  };

  render() {
    const forceRefetch = _get(this.props, 'navigation.state.params.forceRefetch');
    return <GridContainer onGoToPhoto={this.onHandleGoToPhoto} forceRefetch={forceRefetch} />;
  }
}
