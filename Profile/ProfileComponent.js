// @flow

import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import _get from 'lodash/get';
import EmptyView from '../components/EmptyHomeView';
import { FloatingAction } from 'react-native-floating-action';
import type { Match } from '../components/MatchView';
import MatchView from '../components/MatchView';
import { Poppins } from '../components/StyledText';
// $FlowFixMe
import { graphql, QueryProps, Query } from 'react-apollo';
import { FeedQuery } from '../GridView/GridGQL';
import Loading from '../components/Loading';
import colors from '../constants/Colors';

import CommonGrid from '../components/CommonGrid';

type Props = {
  feed: QueryProps,
  onGoToPhoto: () => void,
  forceRefetch?: boolean,
};

class HomeScreen extends Component<Props> {
  keyExtractor = (item: Match, index: number) => `${item.uri}-${item.date}-${index}`;

  renderSeparator = () => <View height={5} backgroundColor={colors.primaryText} />;

  renderHeader = () => (
    <TouchableOpacity
      onPress={this.props.onGoBack}
      style={{
        marginLeft: 10,
        flexDirection: 'row',
      }}
    >
      <Ionicons name="md-arrow-round-back" size={28} color={colors.primaryText} />
      <Poppins type="header" style={{ marginLeft: 5 }}>
        Welcome to {this.props.feed.feed[0].user.name}'s profile!
      </Poppins>
    </TouchableOpacity>
  );

  render() {
    console.log('sapdap', this.props);
    return (
      <CommonGrid {...this.props}>
        {() => (
          <FlatList
            contentContainerStyle={{ flexGrow: 1, backgroundColor: colors.primary }}
            keyExtractor={this.keyExtractor}
            ItemSeparatorComponent={this.renderSeparator}
            data={this.props.feed.feed}
            renderItem={item => <MatchView {...item.item} isEdit={false} />}
            ListHeaderComponent={this.renderHeader}
          />
        )}
      </CommonGrid>
    );
  }
}

export default HomeScreen;
