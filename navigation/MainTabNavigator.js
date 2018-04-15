import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import HomeScreen from '../GridView/GridScreen';
// import SettingsScreen from '../screens/SettingsScreen';
import MatchView from '../screens/TestView';
import Login from '../Login/LoginScreen';
import GetPhoto from '../Photo/GetPhotoScreen';
import Statistics from '../Statistics/StatisticsScreen';

const getTestView = () => {
  if (__DEV__) {
    return {
      Test: {
        screen: MatchView,
      },
    };
  } else {
    return {};
  }
};
// ...getTestView(),
export default TabNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Statistics: {
      screen: Statistics,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Home':
            iconName =
              Platform.OS === 'ios'
                ? `ios-information-circle${focused ? '' : '-outline'}`
                : 'md-information-circle';
            break;
          case 'Statistics':
            iconName = Platform.OS === 'ios' ? `md-stats` : 'md-options';
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    tabBarComponent: props => <TabBarBottom {...props} />,
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: false,
  },
);
