// @flow

import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
// $FlowFixMe
import { ImagePicker, Location, Permissions } from 'expo';
import { FloatingAction } from 'react-native-floating-action';
import { MaterialIcons } from '@expo/vector-icons';
import { MonoText, Poppins } from '../components/StyledText';
import { get } from '../api/fetch';
import LinksScreen from './LinksScreen';
import colors from '../constants/Colors';
import Loading from '../components/Loading';
import type { Props as Resultdata } from './LinksScreen';

type Footballclub = {
    capacity: string,
    name: string,
    stadiumName: string,
};

type FootballclubResult = Array<Footballclub>;

type State = {
    resultdata: ?Resultdata,
    text: string,
    footballclubResult?: FootballclubResult,
    showErrorModal: boolean,
};

const actions = [
    {
        text: 'Choose Image',
        name: 'Choose_Image',
        position: 1,
        icon: <MaterialIcons name="photo" size={18} color="white" />,
    },
];

export default class HomeScreen extends React.Component<*, State> {
    state = { resultdata: null, text: '', showErrorModal: false };
    static navigationOptions = {
        header: null,
    };

    getDate = (data: any) => {
        if (data.GPSDateStamp) {
            return this.splitDate(data.GPSDateStamp);
        } else if (data.DateTimeDigitized) {
            return this.splitDate(data.DateTimeDigitized.split(' ')[0]);
        } else {
            return null;
        }
    };

    splitDate = (date: string) => {
        return date.split(':').join('/');
    };

    _onGetPhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: false,
            aspect: [4, 3],
            exif: true,
        });

        if (!result.cancelled) {
            this.date = this.getDate(result.exif);
            this.uri = result.uri;
            if (!result.exif.GPSLatitude) {
                this.setState({
                    showErrorModal: true,
                });
            } else {
                const location = {
                    lat: result.exif.GPSLatitude,
                    long: result.exif.GPSLongitude,
                    date: this.date,
                };
                const resultdata = await get('/football', location);
                resultdata.uri = this.uri;
                resultdata.date = this.date;
                this.setState({
                    resultdata,
                });
            }
        }

        //push screen
    };

    onHandleTextInput = (text: string) => {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(async () => {
            const footballclubResult = await get('/football/footballclub', {
                clubname: text,
            });
            this.setState({
                footballclubResult,
            });
        }, 600);

        this.setState({ text });
    };

    handleClubSelect = async (club: Footballclub) => {
        const that = this;
        const resultdata = await get('/football/searchResult', { ...club, date: this.date });
        resultdata.uri = this.uri;
        resultdata.date = this.date;
        this.setState({
            resultdata,
        });
    };

    timeout: number;
    date: ?string;
    uri: string;

    render() {
        if (this.state.resultdata) {
            return <LinksScreen {...this.state.resultdata} />;
        }
        return (
            <View style={styles.container}>
                <Poppins style={{ marginBottom: 20 }} type="header">
                    Welcome to Stadiumz!
                </Poppins>
                <Poppins style={{ marginBottom: 20, textAlign: 'left', width: '100%' }}>
                    • An app that helps you keep track of the football matches you have attended
                </Poppins>
                <Poppins>
                    • Press on the plus icon in the down right corner to starting adding photos of
                    football stadiums.
                </Poppins>
                <Modal isVisible={this.state.showErrorModal}>
                    <View style={styles.modalContainer}>
                        <Poppins style={{ marginBottom: 20 }} type="header">
                            Oops, we could't not find anything with that picture, sorry :-(
                        </Poppins>
                        <Poppins style={{ width: '100%' }}>
                            Please fill out the football club name below to proceed
                        </Poppins>

                        <TextInput
                            width="100%"
                            height={50}
                            autoFocus
                            placeholder="Football stadium name"
                            value={this.state.text}
                            onChangeText={this.onHandleTextInput}
                        />

                        <Poppins width="100%" type="subHeader">
                            Result:
                        </Poppins>

                        {this.state.footballclubResult &&
                            this.state.footballclubResult.map(result => (
                                <TouchableOpacity
                                    activeOpacity={0.6}
                                    style={{ width: '100%' }}
                                    key={result.name}
                                    onPress={() => {
                                        this.handleClubSelect(result);
                                    }}>
                                    <View
                                        flexDirection="row"
                                        alignItems="center"
                                        width="100%"
                                        justifyContent="space-between">
                                        <View marginVertical={10} width="60%">
                                            <View flexDirection="row">
                                                <Poppins type="bold">Club: </Poppins>
                                                <Poppins>{result.name}</Poppins>
                                            </View>
                                            <View flexDirection="row">
                                                <Poppins type="bold">Stadium: </Poppins>
                                                <Poppins numberOfLines={1}>
                                                    {result.stadiumName}
                                                </Poppins>
                                            </View>
                                        </View>
                                        <Poppins
                                            style={{
                                                borderRadius: 5,
                                                padding: 2,
                                                borderWidth: 1,
                                                borderColor: colors.primaryText,
                                            }}>
                                            Select
                                        </Poppins>
                                    </View>
                                </TouchableOpacity>
                            ))}
                    </View>
                </Modal>
                <Loading />
                <FloatingAction actions={actions} onPressItem={this._onGetPhoto} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },

    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
        padding: 20,
    },

    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
    },
});
