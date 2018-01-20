// @flow

import React from 'react';
import MatchView from '../containers/MatchView';

export default class MatchViewScreen extends React.Component<*, *> {
    static navigationOptions = {
        title: 'MatchView',
    };

    render() {
        return <MatchView {...this.props.navigation.state.params} />;
    }
}
