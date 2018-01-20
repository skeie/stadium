// @flow

import React from 'react';
import GetPhoto from '../containers/GetPhoto';
// $FlowFixMe
import { NavigationActions } from 'react-navigation';

export default class GetPhotoScreen extends React.Component<*, *> {
    static navigationOptions = {
        title: 'Choose Photo',
    };

    handleBack = () => {
        const backAction = NavigationActions.back();
        this.props.navigation.dispatch(backAction);
    };

    render() {
        return <GetPhoto {...this.props} onBack={this.handleBack} />;
    }
}
