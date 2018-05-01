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
import { FeedQuery } from '../GridView/GridGQL';
import Loading from '../components/Loading';
import tracking from '../util/tracking';
import Profile from './ProfileComponent';

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

class HomeScreen extends Component<Props> {
  componentDidMount() {
    tracking.screenView('Profile');
  }

  render() {
    return <Profile {...this.props} />;
  }
}

export default graphql(FeedQuery, {
  name: 'feed',
  options: () => {
    return { variables: { filter: { myRoutes: true } } };
  },
})(HomeScreen);
