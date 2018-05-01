// @flow

import * as React from 'react';
import { View, FlatList, Keyboard } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import _get from 'lodash/get';
import EmptyView from './EmptyHomeView';
import { FloatingAction } from 'react-native-floating-action';
import type { Match } from '../components/MatchView';
import colors from '../constants/Colors';
// $FlowFixMe
import { QueryProps } from 'react-apollo';
import Loading from './Loading';

type Props = {
  feed: QueryProps,
  onGoToPhoto: () => void,
  forceRefetch?: boolean,
  children: () => React.Node,
};

const actions = [
  {
    text: 'Choose Image',
    name: 'Choose_Image',
    position: 1,
    icon: <MaterialIcons name="photo" size={18} color="white" />,
  },
];
class HomeScreen extends React.Component<Props> {
  componentDidMount() {
    if (this.props.forceRefetch) {
      this.props.feed.refetch();
    }
    Keyboard.dismiss();
  }

  render() {
    const { feed, children } = this.props;

    if (feed.loading) {
      return (
        <View flex={1} justifyContent="center" alignItems="center">
          <Loading />
        </View>
      );
    }
    const showEmptyView =
      _get(this.props, 'navigation.state.params.showFirstTimeView') ||
      !feed.feed ||
      feed.feed.length === 0;

    return (
      <View flex={1} backgroundColor={colors.primary}>
        {showEmptyView ? <EmptyView /> : children()}
        <FloatingAction actions={actions} onPressItem={this.props.onGoToPhoto} />
      </View>
    );
  }
}

export default HomeScreen;
