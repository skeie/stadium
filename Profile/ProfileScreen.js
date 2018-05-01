// @flow

import React from 'react';
import ProfileContainer from './ProfileContainer';
// $FlowFixMe
import { NavigationActions, SafeAreaView } from 'react-navigation';
import colors from '../constants/Colors';

export default class NoMetaDataModal extends React.Component<*, *> {
  static navigationOptions = {
    header: null,
  };

  handleGoBack = () => {
    const backAction = NavigationActions.back();
    this.props.navigation.dispatch(backAction);
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
        <ProfileContainer onGoBack={this.handleGoBack} />
      </SafeAreaView>
    );
  }
}
