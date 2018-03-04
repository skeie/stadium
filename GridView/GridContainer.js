// @flow

import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import EmptyView from '../components/EmptyHomeView';
import { FloatingAction } from 'react-native-floating-action';
import EmptyHomeView from '../components/EmptyHomeView';
import type { Match } from '../components/MatchView';
import MatchView from '../components/MatchView';
import colors from '../constants/Colors';

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

const FeedQuery = `
query {
    feed {
        id
        date,
        startTime,
        homeTeam,
        awayTeam,
        uri,
        goalsHomeTeam,
        goalsAwayTeam,
        created,
        updated,
            stadium {
              name,
          capacity,
          footballTeamName,
          updated,
        },
        goalScorers {
          name,
          minute,
          team
          updated,
        }
      }
}
`;

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

const actions = [
    {
        text: 'Choose Image',
        name: 'Choose_Image',
        position: 1,
        icon: <MaterialIcons name="photo" size={18} color="white" />,
    },
];
class HomeScreen extends Component<*, State> {
    state = { resultdata: null, text: '', showErrorModal: false };

    keyExtractor = (item: Match, index: number) => `${item.uri}-${item.date}-${index}`;

    renderSeparator = () => <View height={5} backgroundColor={colors.primaryText} />;

    render() {
        const { matches = require('../testData/gridView').default } = this.props;
        // return <MatchViewContainer {...matches} isEdit={false} />;
        return (
            <View flex={1}>
                <FlatList
                    keyExtractor={this.keyExtractor}
                    ItemSeparatorComponent={this.renderSeparator}
                    data={matches}
                    renderItem={item => <MatchView {...item.item} isEdit={false} />}
                />
                <FloatingAction actions={actions} onPressItem={this.props.onGoToPhoto} />
            </View>
        );
    }
}

export default HomeScreen;
