import gql from 'graphql-tag';

export const FeedQuery = gql`
  query {
    feed {
      user {
        name
      }
      id
      date
      startTime
      homeTeam
      awayTeam
      uri
      goalsHomeTeam
      goalsAwayTeam
      created
      updated
      stadium {
        name
        capacity
        footballTeamName
        updated
      }
      goalScorers {
        name
        minute
        team
        updated
      }
    }
  }
`;
