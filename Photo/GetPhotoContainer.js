// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import _get from 'lodash/get';
// $FlowFixMe
import { ImagePicker, Location, Permissions } from 'expo';
import { get } from '../api/fetch';
import Loading from '../components/Loading';
import tracking from '../util/tracking';
type State = {
  showErrorModal: boolean,
  resultData: any,
};

class GetPhoto extends Component<*, State> {
  state = {
    showErrorModal: false,
    resultData: {},
  };

  getDate = (data: any) => {
    if (data) {
      if (data.GPSDateStamp) {
        return this.splitDate(data.GPSDateStamp);
      } else if (data.DateTimeDigitized) {
        return this.splitDate(data.DateTimeDigitized.split(' ')[0]);
      }
    }
    return null;
  };

  splitDate = (date: string) => {
    return date.split(':').join('/');
  };

  getPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      aspect: [4, 3],
      exif: true,
    });
    if (!result.cancelled) {
      const date = this.getDate(result.exif);
      // const date = '2014/03/15';
      const { GPSLatitude, GPSLongitude } = _get(result, 'exif');
      if (!date) {
        // Pretend to be smart
        setTimeout(() => {
          this.props.showNoMetaDataModal();
        }, 2000);
      } else if (!GPSLatitude || !GPSLongitude) {
        // Pretend to be smart
        setTimeout(() => {
          this.props.showSearchClubModal(result.uri, date);
        }, 2000);
      } else {
        const location = {
          lat: GPSLatitude,
          long: GPSLongitude,
          date,
        };

        this.props.navigation.navigate('MatchView', { ...location, uri: result.uri });
      }
    } else {
      this.props.onBack();
    }
  };

  componentDidMount() {
    tracking.screenView('GetPhoto');
    this.getPhoto();
  }

  render() {
    return (
      <View flex={1} justifyContent="center" alignItems="center">
        <Loading />
      </View>
    );
  }
}

export default GetPhoto;
