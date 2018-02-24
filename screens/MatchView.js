// @flow

import React from 'react';
import MatchView from '../containers/MatchView';
import MatchViewWithData from '../containers/MatchViewWithData';
// $FlowFixMe
import { NavigationActions } from 'react-navigation';

export default class MatchViewScreen extends React.Component<*, *> {
    static navigationOptions = {
        title: 'MatchView',
    };

    goBack = () => {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'MainScreen' })],
        });
    };

    render() {
        if (this.props.navigation.state.params.match) {
            return (
                <MatchViewWithData {...this.props.navigation.state.params} goBack={this.goBack} />
            );
        }
        return <MatchView {...this.props.navigation.state.params} goBack={this.goBack} />;
    }
}
