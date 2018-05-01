
import 'react-native';
import React from 'react';
import SearchClubComponent from '../SearchClubComponent';
import renderer from 'react-test-renderer';

const searchRes = [
    { name: "Real Madrid Castilla", stadiumName: "Alfredo di Stéfano Stadium", capacity: 24000, __typename: "Club" },
    { name: "Real Madrid Club de Fútbol", stadiumName: "Santiago Bernabéu Stadium", capacity: 99454, __typename: "Club" },
    { name: "Real Madrid FC", stadiumName: "Juan Ramón Loubriel Stadium", capacity: 22000, __typename: "Club" },
];


it('Button renders correctly', () => {
    const tree = renderer.create(
        <SearchClubComponent
            getMatchData={jest.fn()} fetching={false}
            toggleModal={jest.fn()}
            isVisible onHandleTextInput={jest.fn()}
            footballclubResult={searchRes}
        />).toJSON();
    expect(tree).toMatchSnapshot();
});

