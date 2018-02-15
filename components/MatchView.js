// @flow

import React from 'react';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity, ScrollView, View, Image, Dimensions } from 'react-native';
import colors from '../constants/Colors';
import { Poppins } from './StyledText';

const { height } = Dimensions.get('window');

export type Match = {
    stadium: { capacity: number, name: string },
    startTime: string,
    homeTeam: string,
    awayTeam: string,
    goalsHomeTeam: number,
    goalsAwayTeam: number,
    goalScorers: Array<{ name: string, minute: Array<string>, team: string }>,
    uri: string,
    date: string,
};

export type Props = Match & {
    onPostMatch: Match => void,
    isEdit: boolean,
};

type GoalScorer = {
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
                <View
                    flexDirection="column"
                    padding={5}
                    justifyContent="space-around"
                    minHeight="10%">
                    <View flexDirection="row">
                        <Entypo name="location-pin" size={25} color="#553555" />
                        <Poppins style={{ marginLeft: 2 }} type="header">
                            {props.stadium.name}
                        </Poppins>
                    </View>
                    <View marginLeft={27} marginRight={5} flex={1}>
                        <View
                            flexDirection="row"
                            alignItems="center"
                            justifyContent="space-between">
                            <Poppins>Capacity: {props.stadium.capacity}</Poppins>
                            <Poppins>{props.date}</Poppins>
                        </View>
                        <Poppins>Home team: {props.homeTeam}</Poppins>
                    </View>
                </View>
                <Image
                    style={{ width: '100%', height: '50%' }}
                    source={{
                        uri: props.uri,
                    }}
                />
                <View width="100%" flexDirection="row" justifyContent="space-around" padding={10}>
                    <TeamUI team={props.homeTeam} goalScorers={props.goalScorers} />
                    <Poppins type="header">{props.goalsHomeTeam}</Poppins>
                    <Poppins type="header">-</Poppins>
                    <Poppins type="header" style={{ marginRight: 5 }}>
                        {props.goalsAwayTeam}
                    </Poppins>
                    <TeamUI team={props.awayTeam} goalScorers={props.goalScorers} second />
                </View>
            </ScrollView>
        </View>
    );
};

const getGoalScorer = (goalScorers: Array<GoalScorer>, team: string) =>
    goalScorers.filter(goalScorer => goalScorer.team === team);

const TeamUI = ({ team, goalScorers }) => (
    <View flex={1} alignItems="center">
        <Poppins type="header">{team}</Poppins>
        {getGoalScorer(goalScorers, team).map((goalscorer, index) => (
            <View flexDirection="row" alignItems="center" key={index}>
                <MaterialCommunityIcons name="soccer" size={18} color="#553555" />
                <Poppins style={{ marginHorizontal: 3 }}>{goalscorer.name}</Poppins>
                <Poppins>{`(${goalscorer.minute.join(', ')})`}</Poppins>
            </View>
        ))}
    </View>
);

export default MatchView;
