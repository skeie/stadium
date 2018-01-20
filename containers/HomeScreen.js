// @flow

import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import EmptyView from '../components/EmptyHomeView';
import { FloatingAction } from 'react-native-floating-action';
import EmptyHomeView from '../components/EmptyHomeView';
import type { MatchView } from './MatchView';
import type { Props as Resultdata } from '../screens/LinksScreen';
import MatchViewContainer from '../containers/MatchView';
import colors from '../constants/Colors';

type Footballclub = {
    capacity: string,
    name: string,
    stadiumName: string,
};

type FootballclubResult = Array<Footballclub>;

type State = {
    resultdata: ?Resultdata,
    text: string,
    footballclubResult?: FootballclubResult,
    showErrorModal: boolean,
};

const actions = [
    {
        text: 'Choose Image',
        name: 'Choose_Image',
        position: 1,
        icon: <MaterialIcons name="photo" size={18} color="white" />,
    },
];
class HomeScreen extends Component<*, State> {
    state = { resultdata: null, text: '', showErrorModal: false };

    keyExtractor = (item, index: number) => `${item.uri}-${item.date}-${index}`;

    renderSeparator = () => <View height={5} backgroundColor={colors.primaryText} />;

    render() {
        const { matches = require('../testData/gridView').default } = this.props;
        // return <MatchViewContainer {...matches} isEdit={false} />;
        return (
            <View flex={1}>
                {matches.length ? (
                    <FlatList
                        keyExtractor={this.keyExtractor}
                        ItemSeparatorComponent={this.renderSeparator}
                        data={matches}
                        renderItem={item => <MatchViewContainer {...item.item} isEdit={false} />}
                    />
                ) : (
                    <EmptyHomeView />
                )}

                <FloatingAction actions={actions} onPressItem={this.props.onGoToPhoto} />
            </View>
        );
    }
}

export default HomeScreen;
