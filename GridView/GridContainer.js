// @flow

import React, { Component } from 'react';
import { View, FlatList, Keyboard } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import _get from 'lodash/get';
import EmptyView from '../components/EmptyHomeView';
import { FloatingAction } from 'react-native-floating-action';
import type { Match } from '../components/MatchView';
import MatchView from '../components/MatchView';
import colors from '../constants/Colors';
// $FlowFixMe
import { graphql, QueryProps, Query } from 'react-apollo';
import { FeedQuery } from './GridGQL';
import Loading from '../components/Loading';
import tracking from '../util/tracking';
import CommonGrid from '../components/CommonGrid';

type Resultdata = {
  stadium: { capacity: number, name: string },
  startTime: string,
  homeTeam: string,
  awayTeam: string,
  result: { goalsHomeTeam: number, goalsAwayTeam: number },
  goalScorers: Array<{ name: string, minute: Array<string>, team: string }>,
  uri: string,
  date: string,
};

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

type Props = {
  feed: QueryProps,
  onGoToPhoto: () => void,
  forceRefetch?: boolean,
};

const actions = [
  {
    text: 'Choose Image',
    name: 'Choose_Image',
    position: 1,
    icon: <MaterialIcons name="photo" size={18} color="white" />,
  },
];
class HomeScreen extends Component<Props> {
  componentDidMount() {
    tracking.screenView('GridView');
  }

  keyExtractor = (item: Match, index: number) => `${item.uri}-${item.date}-${index}`;

  renderSeparator = () => <View height={5} backgroundColor={colors.primaryText} />;

  render() {
    return (
      <CommonGrid {...this.props}>
        {() => (
          <FlatList
            contentContainerStyle={{ flexGrow: 1, backgroundColor: colors.primary }}
            keyExtractor={this.keyExtractor}
            ItemSeparatorComponent={this.renderSeparator}
            data={this.props.feed.feed}
            renderItem={item => <MatchView {...item.item} isEdit={false} />}
          />
        )}
      </CommonGrid>
    );
  }
}

export default graphql(FeedQuery, {
  name: 'feed',
  options: () => {
    return { variables: { filter: { myRoutes: false } } };
  },
})(HomeScreen);
