// @flow
import * as React from 'react';
import { ScrollView, View } from 'react-native';
// $FlowFixMe
import { SafeAreaView } from 'react-navigation';
import { Poppins } from '../components/StyledText';
import colors from '../constants/Colors';

import type { Match } from '../components/MatchView';

type Props = {
  totalGoals: number,
  homeVictory: number,
  awayVictory: number,
  even: number,
  years: {
    [number]: number,
  },
  avgGoal: number,
  matchWithMostGoals: Match,
  clubs: {
    [string]: number,
  },
  favClub: {
    club: string,
    seen: number,
  },
};

const Element = ({ children }: { children: React.Node }) => (
  <View
    paddingTop={20}
    paddingBottom={20}
    borderBottomWidth={1}
    borderBottomColor={colors.primaryText}
  >
    <Poppins>• {children}</Poppins>
  </View>
);

function Statistics(props: Props) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
      <ScrollView
        contentContainerStyle={{
          backgroundColor: colors.primary,
          padding: 20,
          flexGrow: 1,
          paddingBottom: 100,
        }}
      >
        <Poppins style={{ marginBottom: 20 }} type="header">
          Did you know...?
        </Poppins>
        <Element>
          that the match between {props.matchWithMostGoals.homeTeam} vs{' '}
          {props.matchWithMostGoals.awayTeam} is the one you've seen with most goals? ({
            props.matchWithMostGoals.goalsHomeTeam
          }
          -{props.matchWithMostGoals.goalsAwayTeam})
        </Element>
        <Element>that you have seen a total of {props.totalGoals} goals?</Element>
        <Element>that you have seen a total of {props.homeVictory} home wins?</Element>
        <Element>that you have seen a total of {props.awayVictory} away wins?</Element>
        <Element>that you have seen a total of {props.even} draws?</Element>
        <Element>that you average a number of {props.avgGoal.toFixed(2)} goals per match?</Element>
        {Object.entries(props.years).map(([key, value]) => (
          <Element key={key}>
            that you went to {value} game(s) in {key}
          </Element>
        ))}
        <Element>the team you have seen the most is {props.favClub.club}</Element>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Statistics;
