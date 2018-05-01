// @flow

import React from 'react';
import { Entypo, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity, ScrollView, View, Image, Dimensions } from 'react-native';
import colors from '../constants/Colors';
import { Poppins } from './StyledText';
import Top from './MatchView/Top';
import ScoreView from './MatchView/ScoreView';
import User from './User';

const { height, width } = Dimensions.get('window');

export type Match = {
  stadium: { capacity: number, name: string },
  startTime: string,
  homeTeam: string,
  awayTeam: string,
  goalsHomeTeam: number,
  goalsAwayTeam: number,
  goalScorers: Array<GoalScorer>,
  uri: string,
  date: string,
  user: {
    name: string,
  },
};

export type Props = Match & {
  onChangeHomeTeam: string => void,
  editable?: boolean,
  onChangeStadium?: () => *,
  onGoToProfile?: () => *,
};

export type GoalScorer = {
  name: string,
  minute: string,
  team: string,
};

const MatchView = (props: Props) => {
  if (!props.stadium) {
    return null;
  }

  return (
    <View flex={1} backgroundColor={colors.primary} paddingTop={10}>
      <ScrollView
        contentContainerStyle={{
          backgroundColor: colors.primary,
        }}
      >
        <User user={props.user} onGoToProfile={props.onGoToProfile} />
        <Top
          onChangeStadium={props.onChangeStadium}
          name={props.stadium.name}
          capacity={props.stadium.capacity}
          date={props.date}
          homeTeam={props.homeTeam}
          onChangeHomeTeam={props.onChangeHomeTeam}
          editable={props.editable}
        />
        <Image
          style={{ width, height: height / 2, marginTop: 10 }}
          source={{
            uri: props.uri,
          }}
        />
        <ScoreView
          homeTeam={props.homeTeam}
          goalScorers={props.goalScorers}
          awayTeam={props.awayTeam}
          goalsAwayTeam={props.goalsAwayTeam}
          goalsHomeTeam={props.goalsHomeTeam}
        />
      </ScrollView>
    </View>
  );
};

export default MatchView;
