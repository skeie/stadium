import gql from 'graphql-tag';

export const searchClubQL = gql`
  mutation($clubName: String!) {
    getClub(clubName: $clubName) {
      name
      stadiumName
      capacity
    }
  }
`;

export const getMatchQL = gql`
  mutation($date: String!, $stadiumName: String!, $capacity: Int!, $name: String!) {
    matchBasedOnFootballTeam(
      date: $date
      stadiumName: $stadiumName
      capacity: $capacity
      name: $name
    ) {
      startTime
      homeTeam
      awayTeam
      goalsHomeTeam
      goalsAwayTeam
      stadium {
        capacity
        name
      }
      goalScorers {
        name
        minute
        team
      }
    }
  }
`;
