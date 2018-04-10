// @flow

import React from 'react';
import NoMetaDataContainer from './NoMetaDataContainer';
// $FlowFixMe
import { NavigationActions } from 'react-navigation';

export default class NoMetaDataModal extends React.Component<*, *> {
  handleGoBack = () => {
    // Hack to go back to main menu
    this.props.navigation.goBack();
    const backAction = NavigationActions.back();
    this.props.navigation.dispatch(backAction);
  };

  render() {
    return <NoMetaDataContainer onGoBack={this.handleGoBack} />;
  }
}
