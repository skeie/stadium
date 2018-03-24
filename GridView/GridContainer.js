// @flow

import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { FloatingAction } from 'react-native-floating-action';
import EmptyHomeView from '../components/EmptyHomeView';
import type { Match } from '../components/MatchView';
import MatchView from '../components/MatchView';
import colors from '../constants/Colors';
// $FlowFixMe
import { graphql, QueryProps } from 'react-apollo';
import { FeedQuery } from './GridGQL'
import Loading from '../components/Loading'

type Resultdata = {
    stadium: { capacity: number, name: string },
    startTime: string,
    homeTeam: string,
    awayTeam: string,
    result: { goalsHomeTeam: number, goalsAwayTeam: number },
    goalScorers: Array<{ name: string, minute: Array<string>, team: string }>,
    uri: string,
    date: string,
}

type GoalScorer = {
    name: string,
    minute: Array<string>,
    team: string,
};

type Item = {
    item: Match,
};

type Footballclub = {
    capacity: string,
    name: string,
    stadiumName: string,
};

type FootballclubResult = Array<Footballclub>;

type State = {
    resultdata: ?Resultdata,
    text: string,
    footballclubResult?: FootballclubResult,
    showErrorModal: boolean,
};

type Props = {
    feed: QueryProps,
    onGoToPhoto: () => void,
}

const actions = [
    {
        text: 'Choose Image',
        name: 'Choose_Image',
        position: 1,
        icon: <MaterialIcons name="photo" size={18} color="white" />,
    },
];
class HomeScreen extends Component<Props, State> {
    state = { resultdata: null, text: '', showErrorModal: false };

    keyExtractor = (item: Match, index: number) => `${item.uri}-${item.date}-${index}`;

    renderSeparator = () => <View height={5} backgroundColor={colors.primaryText} />;

    render() {
        const { feed } = this.props;
        if (feed.loading) {
            return (
                <View flex={1} justifyContent="center" alignItems="center">
                    <Loading />
                </View>
            )
        }
        // return <MatchViewContainer {...matches} isEdit={false} />;
        return (
            <View flex={1}>
                <FlatList
                    keyExtractor={this.keyExtractor}
                    ItemSeparatorComponent={this.renderSeparator}
                    data={feed.feed}
                    renderItem={item => <MatchView {...item.item} isEdit={false} />}
                />
                <FloatingAction actions={actions} onPressItem={this.props.onGoToPhoto} />
            </View>
        );
    }
}

export default graphql(FeedQuery, { name: 'feed' })(HomeScreen);
