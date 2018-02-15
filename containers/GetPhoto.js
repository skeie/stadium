// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
// $FlowFixMe
import { ImagePicker, Location, Permissions } from 'expo';
import { get } from '../api/fetch';
import Loading from '../components/Loading';
type State = {
    showErrorModal: boolean,
    resultData: any,
};

class GetPhoto extends Component<*, State> {
    state = {
        showErrorModal: false,
        resultData: {},
    };

    date: ?string;
    uri: string;

    getDate = (data: any) => {
        if (data.GPSDateStamp) {
            return this.splitDate(data.GPSDateStamp);
        } else if (data.DateTimeDigitized) {
            return this.splitDate(data.DateTimeDigitized.split(' ')[0]);
        } else {
            return null;
        }
    };

    splitDate = (date: string) => {
        return date.split(':').join('/');
    };

    getPhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: false,
            aspect: [4, 3],
            exif: true,
            base64: true,
        });

        if (!result.cancelled) {
            this.date = this.getDate(result.exif);
            this.uri = `data:image/png;base64,${result.base64}`;
            if (!result.exif.GPSLatitude) {
                // Pretend to be smart
                setTimeout(() => {
                    this.props.showSearchClubModal(this.uri, this.date);
                }, 2000);
            } else {
                const location = {
                    lat: result.exif.GPSLatitude,
                    long: result.exif.GPSLongitude,
                    date: this.date,
                };
                this.props.navigation.navigate('MatchView', { ...location, uri: this.uri });
            }
        } else {
            this.props.onBack();
        }
    };

    componentDidMount() {
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
