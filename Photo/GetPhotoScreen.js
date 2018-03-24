// @flow

import React from 'react';
import GetPhoto from './GetPhotoContainer';
// $FlowFixMe
import { NavigationActions } from 'react-navigation';

export default class GetPhotoScreen extends React.Component<*, *> {
  static navigationOptions = {
    header: null,
  };

  handleBack = () => {
    const backAction = NavigationActions.back();
    this.props.navigation.dispatch(backAction);
  };

  showSearchClubModal = (uri: string, date: string) => {
    this.props.navigation.navigate('SearchClubModal', { uri, date });
  };

  render() {
    return (
      <GetPhoto
        {...this.props}
        showSearchClubModal={this.showSearchClubModal}
        onBack={this.handleBack}
      />
    );
  }
}
