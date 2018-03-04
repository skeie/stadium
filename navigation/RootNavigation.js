// @flow

import React from 'react';
import { UIManager } from 'react-native';
// $FlowFixMe
import { Notifications } from 'expo';
// $FlowFixMe
import { StackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

import Photo from '../Photo/GetPhotoScreen';
import MatchView from '../MatchView/MatchViewScreen';
import Login from '../Login/LoginScreen';

import SearchClubModal from '../SearchClub/SearchClubModal';
import { isSignedIn } from '../util/auth';
import Loading from '../components/Loading';

UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);

const rootStackNavigator = (signedIn: boolean) =>
    StackNavigator(
        {
            Main: {
                screen: MainTabNavigator,
            },
            Photo: {
                screen: Photo,
            },
            MatchView: {
                screen: MatchView,
            },
            Login: {
                screen: Login,
            },
        },
        {
            initialRouteName: signedIn ? 'Main' : 'Login',
            navigationOptions: () => ({
                headerTitleStyle: {
                    fontWeight: 'normal',
                },
            }),
        },
    );

const mainModalNavigator = (signedIn: boolean) =>
    StackNavigator(
        {
            RootStackNavigator: { screen: rootStackNavigator(signedIn) },
            SearchClubModal: { screen: SearchClubModal },
        },
        {
            mode: 'modal',
            headerMode: 'none',
        },
    );

export default class RootNavigator extends React.Component<*, *> {
    state = {
        isLoggedIn: null,
        checkedSignIn: false,
    };
    notificationSubscription: any;

    componentDidMount() {
        this.getUser();
        this.notificationSubscription = this.registerForPushNotifications();
    }

    componentWillUnmount() {
        this.notificationSubscription && this.notificationSubscription.remove();
    }

    getUser = async () => {
        const isLoggedIn = await isSignedIn();
        this.setState({
            isLoggedIn,
            checkedSignIn: true,
        });
    };

    render() {
        if (!this.state.checkedSignIn) {
            return null;
        }

        const MainScreen = mainModalNavigator(this.state.isLoggedIn);
        return <MainScreen />;
    }

    registerForPushNotifications() {
        // Send our push token over to our backend so we can receive notifications
        // You can comment the following line out if you want to stop receiving
        // a notification every time you open the app. Check out the source
        // for this function in api/registerForPushNotificationsAsync.js
        registerForPushNotificationsAsync();

        // Watch for incoming notifications
        this.notificationSubscription = Notifications.addListener(this._handleNotification);
    }

    _handleNotification = ({ origin, data }) => {
        console.log(`Push notification ${origin} with data: ${JSON.stringify(data)}`);
    };
}
