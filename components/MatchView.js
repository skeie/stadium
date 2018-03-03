// @flow

import React from 'react';
import { Entypo, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity, ScrollView, View, Image, Dimensions } from 'react-native';
import colors from '../constants/Colors';
import { Poppins } from './StyledText';
import Top from './MatchView/Top';
import ScoreView from './MatchView/ScoreView';

const { height } = Dimensions.get('window');

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
};

export type Props = Match & {
    onChangeHomeTeam: string => void,
};

export type GoalScorer = {
    name: string,
    minute: Array<string>,
    team: string,
};

const MatchView = (props: Props) => {
    return (
        <View flex={1} backgroundColor={colors.primary}>
            <ScrollView
                contentContainerStyle={{
                    height: height / 1.5,
                    justifyContent: 'space-around',
                    backgroundColor: colors.primary,
                }}>
                <Top
                    name={props.stadium.name}
                    capacity={props.stadium.capacity}
                    date={props.date}
                    homeTeam={props.homeTeam}
                    onChangeHomeTeam={props.onChangeHomeTeam}
                />
                <Image
                    style={{ width: '100%', height: '50%' }}
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
