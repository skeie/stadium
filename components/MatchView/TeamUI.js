// @flow

import React from 'react';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity, ScrollView, View, Image, Dimensions } from 'react-native';
import { Poppins } from '../StyledText';

import type { GoalScorer } from '../MatchView';

type Props = {
  goalScorers: Array<GoalScorer>,
  team: string,
};

const getGoalScorer = (goalScorers: Array<GoalScorer>, team: string) =>
  goalScorers.filter(goalScorer => goalScorer.team === team);

const TeamUI = ({ team, goalScorers }: Props) => {
  return (
    <View flex={1} alignItems="center">
      <Poppins type="header">{team}</Poppins>
      {getGoalScorer(goalScorers, team).map((goalscorer, index) => (
        <View flexDirection="row" alignItems="center" key={index}>
          <MaterialCommunityIcons name="soccer" size={18} color="#553555" />
          <Poppins style={{ marginHorizontal: 3 }}>{goalscorer.name}</Poppins>
          <Poppins>{`(${goalscorer.minute})`}</Poppins>
        </View>
      ))}
    </View>
  );
};

export default TeamUI;
