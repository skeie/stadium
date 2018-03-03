import React from 'react';
import { View } from 'react-native';
import MatchView from '../containers/SearchClub';
const props = {
    lat: 51.474821666666664,
    long: 0.22192833333333334,
    date: '2017/11/18',
    uri:
        'data:image/png;base64,/9j/4AAQSkZJRgABAQAASABIAAD/…KACilFJQAUUUooASiiigAoopaAEpaSloASiiigApaKKAP/9k=',
};

export default class SettingsScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
        return (
            <View paddingTop={40} flex={1}>
                <MatchView {...props} />
            </View>
        );
    }
}
