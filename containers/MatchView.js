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
import omitDeep from 'omit-deep-lodash';
import type { Match } from '../components/MatchView';

type Props = {
    date: string,
    lat: number,
    long: number,
    uri: string,
    matchQuery: QueryProps,
    matchMutation: *,
    goBack: () => void,
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
            const props = { ...match, uri: this.image, date: this.props.date };
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

    handleSave = async () => {
        const match = omitDeep(this.state.match, '__typename');
        try {
            await this.props.matchMutation({
                variables: {
                    ...match,
                }
            })
            this.props.goBack();
        } catch (error) {
            console.log('something bad happen, try again');
        }

    }

    render() {
        const { loading } = this.props.matchQuery;
        if (loading && !this.state.match) {
            return (
                <View flex={1} justifyContent="center" alignItems="center">
                    <Loading />
                </View>
            );
        }
        return (
            <View flex={1}>
                <MatchViewUI editable onChangeHomeTeam={this.handleChangeHomeTeam} {...this.state.match} />
                <View
                    flexDirection="row"
                    height="15%"
                    backgroundColor={colors.primary}
                    alignItems="center"
                    justifyContent="space-around">
                    <Button style={{ width: '40%' }}>Discard</Button>
                    <Button style={{ width: '40%' }} onPress={this.handleSave}>
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
