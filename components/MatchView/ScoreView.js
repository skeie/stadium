// @flow
import React from 'react';
import { Entypo, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity, ScrollView, View, Image, Dimensions } from 'react-native';
import { Poppins } from '../StyledText';
import TeamUI from './TeamUI';

import type { GoalScorer } from '../MatchView';

type Props = {
    homeTeam: string,
    goalScorers: Array<GoalScorer>,
    goalsHomeTeam: number,
    goalsAwayTeam: number,
    awayTeam: string,
};

const ScoreView = (props: Props) => {
    return (
        <View width="100%" flexDirection="row" justifyContent="space-around" padding={10}>
            <TeamUI team={props.homeTeam} goalScorers={props.goalScorers} />
            <Poppins type="header">{props.goalsHomeTeam}</Poppins>
            <Poppins type="header">-</Poppins>
            <Poppins type="header" style={{ marginRight: 5 }}>
                {props.goalsAwayTeam}
            </Poppins>
            <TeamUI team={props.awayTeam} goalScorers={props.goalScorers} second />
        </View>
    );
};

export default ScoreView;
