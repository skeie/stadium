// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import MatchViewUI from '../components/MatchView';
import Button from '../components/Button';
import Loading from '../components/Loading';
import { post } from '../api/fetch';
import colors from '../constants/Colors';
import { MatchMutation, MatchQuery } from './MatchViewQL';
import { uploadPhoto } from '../api/fetch';
// $FlowFixMe
import { graphql, compose, QueryProps } from 'react-apollo';

import type { Match } from '../components/MatchView';

type Props = {
    date: string,
    lat: number,
    long: number,
    uri: string,
    matchQuery: QueryProps,
};

type State = {
    match?: Match,
};

class MatchView extends Component<Props, *> {
    image: string;

    state = {
        match: null,
    };

    componentWillReceiveProps(nextProps) {
        if (!nextProps.matchQuery.loading && this.props.matchQuery.loading) {
            const { match } = nextProps.matchQuery;
            const props = { ...match, uri: this.image };
            this.setState({
                match: props,
            });
        }
    }

    changeMatch = (property: string) => (value: string) => {
        this.setState(({ match }) => ({
            match: {
                ...match,
                [property]: value,
                goalScorers: this.updateGoalscorer(
                    value,
                    match.goalScorers,
                    this.state.match ? this.state.match.homeTeam : '',
                ),
            },
        }));
    };

    updateGoalscorer = (newHomeTeam, goalScorers, homeTeam) => {
        return goalScorers.map(goalScorer => {
            return {
                ...goalScorer,
                team: goalScorer.team === homeTeam ? newHomeTeam : goalScorer.team,
            };
        });
    };

    handleChangeHomeTeam = this.changeMatch('homeTeam');

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
        const { loading } = this.props.matchQuery;
        if (loading && !this.state.match) {
            return (
                <View flex={1} justifyContent="center" alignItems="center">
                    <Loading />
                </View>
            );
        }
        console.log('props', this.state);
        return (
            <View flex={1}>
                <MatchViewUI onChangeHomeTeam={this.handleChangeHomeTeam} {...this.state.match} />
                <View
                    flexDirection="row"
                    height="15%"
                    backgroundColor={colors.primary}
                    alignItems="center"
                    justifyContent="space-around">
                    <Button style={{ width: '40%' }}>Discard</Button>

                    <Button style={{ width: '40%' }} onPress={() => { }}>
                        Save
                    </Button>
                </View>
            </View>
        );
    }
}

export default compose(
    graphql(MatchMutation, {
        name: 'matchMutation',
    }),
    graphql(MatchQuery, {
        name: 'matchQuery',
    }),
)(MatchView);
