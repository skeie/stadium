// @flow

import React, { Component } from 'react';
// $FlowFixMe
import { graphql, compose } from 'react-apollo';
import Statistics from './StatisticsComponent';
import { FeedQuery } from '../GridView/GridGQL';
import Loading from '../components/Loading';
import EmptyView from '../components/EmptyHomeView';
import type { Match } from '../components/MatchView';
import CommonGrid from '../components/CommonGrid';

type Props = {
  feed: {
    loading: boolean,
    feed: Array<Match>,
  },
};

export class StatisticsContainer extends Component<*> {
  matchWithMostGoals = (currentValue: *, prevValue: *, numberOfGoals: *) => {
    if (numberOfGoals > prevValue.numberOfGoals) {
      return {
        numberOfGoals,
        matchWithMostGoals: currentValue,
      };
    }
    return prevValue;
  };

  numberOfVicotires = (prevValue: *, currentValue: *) => {
    let { homeVictory, awayVictory, even } = prevValue;
    if (currentValue.goalsAwayTeam > currentValue.goalsHomeTeam) {
      awayVictory++;
    } else if (currentValue.goalsAwayTeam < currentValue.goalsHomeTeam) {
      homeVictory++;
    } else even++;

    return { homeVictory, awayVictory, even };
  };

  numberOfMatchesAYear = (currentValue: *, prevValue: *) => {
    const matchDate = new Date(currentValue.date);
    const { years } = prevValue;
    let currentNumber = years[matchDate.getFullYear()] || 0;
    return { years: { ...years, [matchDate.getFullYear()]: ++currentNumber } };
  };

  favoriteTeam = (currentValue: Match, prevValue: *) => {
    const { clubs } = prevValue;
    let currentHomeTeam = clubs[currentValue.homeTeam] || 0;
    let currentAwayTeam = clubs[currentValue.awayTeam] || 0;
    return {
      clubs: {
        ...clubs,
        [currentValue.homeTeam]: ++currentHomeTeam,
        [currentValue.awayTeam]: ++currentAwayTeam,
      },
    };
  };

  getFavClub = (clubs: *) => {
    return Object.entries(clubs).reduce(
      (prevValue, [club, seen]) => {
        if (prevValue.seen < seen) {
          prevValue.club = club;
          prevValue.seen = seen;
        }
        return prevValue;
      },
      { club: '', seen: 0 },
    );
  };

  data = (matches: Array<Match>) => {
    const data = matches.reduce(
      (prevValue, currentValue) => {
        const numberOfGoals = currentValue.goalsHomeTeam + currentValue.goalsAwayTeam;
        const matchWithMostGoals = this.matchWithMostGoals(currentValue, prevValue, numberOfGoals);
        const numberOfVictories = this.numberOfVicotires(prevValue, currentValue);
        const numberOfMatchesAYear = this.numberOfMatchesAYear(currentValue, prevValue);
        const clubs = this.favoriteTeam(currentValue, prevValue);
        prevValue.totalGoals += numberOfGoals;
        return {
          ...prevValue,
          ...matchWithMostGoals,
          ...numberOfVictories,
          ...numberOfMatchesAYear,
          ...clubs,
        };
      },
      {
        totalGoals: 0,
        homeVictory: 0,
        awayVictory: 0,
        even: 0,
        years: {},
        avgGoal: 0,
        numberOfGoals: 0,
        clubs: {},
        favClub: {},
      },
    );
    data.avgGoal += data.totalGoals / matches.length;
    data.favClub = this.getFavClub(data.clubs);
    return data;
  };

  render() {
    return (
      <CommonGrid {...this.props}>
        {() => <Statistics {...this.data(this.props.feed.feed)} />}
      </CommonGrid>
    );
  }
}

export default graphql(FeedQuery, {
  name: 'feed',
  options: () => {
    return { variables: { filter: { myRoutes: true } } };
  },
})(StatisticsContainer);
