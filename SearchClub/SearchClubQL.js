import gql from 'graphql-tag';

export const searchClubQL = gql`
    mutation ($clubName: String!) {
        getClub(clubName: $clubName) {
            name,
            stadiumName,
            capacity
        }
    }
`;
