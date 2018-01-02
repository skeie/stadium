// @flow

import React from 'react';
import { ScrollView, StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { Poppins } from '../components/StyledText';

const dummyData = {
    stadium: { capacity: 25700, name: 'Craven Cottage' },
    startTime: '18:30',
    homeTeam: 'Fulham',
    awayTeam: 'Derby County',
    result: { goalsHomeTeam: 1, goalsAwayTeam: 1 },
    goalScorers: [
        { name: 'T. Cairney', minute: ['30'], team: 'Fulham' },
        { name: 'M. Vydra', minute: ['50'], team: 'Derby County' },
    ],
};

type GoalScorer = {
    name: string,
    minute: Array<string>,
    team: string,
};

const getHomeGoalScorer = (
    goalScorers: Array<GoalScorer>,
    team: typeof dummyData.homeTeam | typeof dummyData.awayTeam,
) => goalScorers.filter(goalScorer => goalScorer.team === team);

export default class LinksScreen extends React.Component<*, *> {
    static navigationOptions = {
        title: 'Add',
    };

    render() {
        return (
            <View flex={1} width="100%">
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: 'space-around',
                        backgroundColor: '#ADF1D2',
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
                                    {dummyData.stadium.name}
                                </Poppins>
                                <Poppins>27/11-2017</Poppins>
                            </View>
                        </View>
                        <View marginLeft={27}>
                            <Poppins>Capacity: {dummyData.stadium.capacity}</Poppins>
                            <Poppins>Home team: {dummyData.homeTeam}</Poppins>
                        </View>
                    </View>
                    <Image
                        style={{ width: '100%', height: '50%' }}
                        source={{
                            uri:
                                'file:///Users/skeie/Library/Developer/CoreSimulator/Devices/2B78A035-FDC7-4B95-913E-2BDDB9BF6DA4/data/Containers/Data/Application/DE093D45-1654-44E8-9B36-C10BF6F7EFEE/Library/Caches/ExponentExperienceData/%2540skeie%252Fstadiumz/ImagePicker/E3452869-D986-43A8-9D18-CC6A7CECE906.jpg',
                        }}
                    />
                    <View
                        width="100%"
                        flexDirection="row"
                        justifyContent="space-around"
                        padding={10}>
                        <TeamUI team={dummyData.homeTeam} goalScorers={dummyData.goalScorers} />
                        <Poppins type="header">{dummyData.result.goalsHomeTeam}</Poppins>
                        <Poppins type="header">-</Poppins>
                        <Poppins type="header" style={{ marginRight: 5 }}>
                            {dummyData.result.goalsAwayTeam}
                        </Poppins>
                        <TeamUI
                            team={dummyData.awayTeam}
                            goalScorers={dummyData.goalScorers}
                            second
                        />
                    </View>
                </ScrollView>
                <View
                    flexDirection="row"
                    height="15%"
                    backgroundColor="#ADF1D2"
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
        {getHomeGoalScorer(goalScorers, team).map((goalscorer, index) => (
            <View flexDirection="row" alignItems="center" key={index}>
                <MaterialCommunityIcons name="soccer" size={18} color="#553555" />
                <Poppins style={{ marginHorizontal: 3 }}>{goalscorer.name}</Poppins>
                <Poppins>{`(${goalscorer.minute.join(', ')})`}</Poppins>
            </View>
        ))}
    </View>
);
