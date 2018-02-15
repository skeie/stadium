// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import MatchViewUI from '../components/MatchView';
import Button from '../components/Button';
import Loading from '../components/Loading';
import { post } from '../api/fetch';
import { Connect, query, mutation } from 'urql';
import { NavigationActions } from 'react-navigation';
import colors from '../constants/Colors';
import { MatchMutation, MatchQuery } from './MatchViewQL';
import { uploadPhoto } from '../api/fetch';
import omitDeep from 'omit-deep-lodash';

import type { Match } from '../components/MatchView';

type Props = {
    date: string,
    lat: number,
    long: number,
    uri: string,
};

class MatchView extends Component<Props, *> {
    image: string;

    handlePostMatch = async match => {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'ScreenA', params: { match } })],
        });
    };

    componentDidMount() {
        if (!__DEV__) {
            this.uploadPhoto();
        } else {
            this.image =
                'https://files.graph.cool/cjdizt45h14ca016541zn4b91/cjdj0ihen0ris01022fxo8dkg';
        }
    }

    uploadPhoto = async () => {
        const image = await uploadPhoto(this.props.uri);
        this.image = image.url;
    };

    render() {
        const { uri, ...rest } = this.props;

        return (
            <Connect
                mutation={{
                    addMatch: mutation(MatchMutation),
                }}
                children={({ loaded, fetching, refetch, data, error, addMatch }) => {
                    return (
                        <View flex={1}>
                            <MatchViewUI onPostMatch={this.handlePostMatch} {...this.props.match} />
                            <View
                                flexDirection="row"
                                height="15%"
                                backgroundColor={colors.primary}
                                alignItems="center"
                                justifyContent="space-around">
                                <Button style={{ width: '40%' }}>Discard</Button>

                                <Button
                                    style={{ width: '40%' }}
                                    onPress={() => {
                                        addMatch(match);
                                    }}>
                                    Save
                                </Button>
                            </View>
                        </View>
                    );
                }}
            />
        );
    }
}

export default MatchView;
