// @flow

import React from 'react';
import { ScrollView, StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { Poppins } from '../components/StyledText';
import colors from '../constants/Colors';

export type Props = {
    stadium: { capacity: number, name: string },
    startTime: string,
    homeTeam: string,
    awayTeam: string,
    result: { goalsHomeTeam: number, goalsAwayTeam: number },
    goalScorers: Array<{ name: string, minute: Array<string>, team: string }>,
    uri: string,
    date: string,
};

// const this.props = {
//     stadium: { capacity: 25700, name: 'Craven Cottage' },
//     startTime: '18:30',
//     homeTeam: 'Fulham',
//     awayTeam: 'Derby County',
//     result: { goalsHomeTeam: 1, goalsAwayTeam: 1 },
//     goalScorers: [
//         { name: 'T. Cairney', minute: ['30'], team: 'Fulham' },
//         { name: 'M. Vydra', minute: ['50'], team: 'Derby County' },
//     ],
// };

type GoalScorer = {
    name: string,
    minute: Array<string>,
    team: string,
};

const getGoalScorer = (goalScorers: Array<GoalScorer>, team: string) =>
    goalScorers.filter(goalScorer => goalScorer.team === team);

export default class LinksScreen extends React.Component<Props, *> {
    static navigationOptions = {
        title: 'Statistics',
    };

    render() {
        if (!this.props.stadium) {
            return null;
        }

        return (
            <View flex={1} width="100%" marginTop={50}>
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: 'space-around',
                        backgroundColor: colors.primary,
                    }}>
                    <View width="100%" flexDirection="column" padding={5}>
                        <View flexDirection="row">
                            <Entypo name="location-pin" size={25} color="#553555" />
                            <View
                                flex={1}
                                flexDirection="row"
                                alignItems="center"
                                justifyContent="space-between">
                                <Poppins style={{ marginLeft: 2 }} type="header">
                                    {this.props.stadium.name}
                                </Poppins>
                                <Poppins>{this.props.date}</Poppins>
                            </View>
                        </View>
                        <View marginLeft={27}>
                            <Poppins>Capacity: {this.props.stadium.capacity}</Poppins>
                            <Poppins>Home team: {this.props.homeTeam}</Poppins>
                        </View>
                    </View>
                    <Image
                        style={{ width: '100%', height: '50%' }}
                        source={{
                            uri: this.props.uri,
                        }}
                    />
                    <View
                        width="100%"
                        flexDirection="row"
                        justifyContent="space-around"
                        padding={10}>
                        <TeamUI team={this.props.homeTeam} goalScorers={this.props.goalScorers} />
                        <Poppins type="header">{this.props.result.goalsHomeTeam}</Poppins>
                        <Poppins type="header">-</Poppins>
                        <Poppins type="header" style={{ marginRight: 5 }}>
                            {this.props.result.goalsAwayTeam}
                        </Poppins>
                        <TeamUI
                            team={this.props.awayTeam}
                            goalScorers={this.props.goalScorers}
                            second
                        />
                    </View>
                </ScrollView>
                <View
                    flexDirection="row"
                    height="15%"
                    backgroundColor={colors.primary}
                    alignItems="center"
                    justifyContent="space-around">
                    <TouchableOpacity
                        style={{
                            width: '40%',
                            borderColor: '#553555',
                            borderWidth: 1,
                            alignItems: 'center',
                            padding: 10,
                            borderRadius: 10,
                            marginBottom: 10,
                        }}>
                        <Poppins>Discard</Poppins>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            width: '40%',
                            borderColor: '#553555',
                            borderWidth: 1,
                            alignItems: 'center',
                            padding: 10,
                            borderRadius: 10,
                            marginBottom: 10,
                        }}>
                        <Poppins>Save</Poppins>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
});

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
