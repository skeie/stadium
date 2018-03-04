// @flow

import React from 'react';
import MatchView from './MatchViewContainer';
import MatchViewWithData from './MatchViewWithDataContainer';
// $FlowFixMe
import { NavigationActions } from 'react-navigation';

export default class MatchViewScreen extends React.Component<*, *> {
    static navigationOptions = {
        title: 'MatchView',
    };

    goBack = () => {
        const resetAction = NavigationActions.reset({
            index: 0,
            key: null,
            actions: [
                NavigationActions.navigate({ routeName: 'RootStackNavigator' })
            ]
        });
        this.props.navigation.dispatch(resetAction);
    }



    render() {
        if (this.props.navigation.state.params.match) {
            return (
                <MatchViewWithData {...this.props.navigation.state.params} goBack={this.goBack} />
            );
        }
        return <MatchView {...this.props.navigation.state.params} goBack={this.goBack} />;
    }
}
