import gql from 'graphql-tag';
export const MatchQuery = gql`
  query($lat: Float!, $long: Float!, $date: String!) {
    match(lat: $lat, long: $long, date: $date) {
      stadium {
        capacity
        name
      }
      startTime
      homeTeam
      awayTeam
      goalsHomeTeam
      goalsAwayTeam
      goalScorers {
        name
        minute
        team
      }
    }
  }
`;

export const MatchMutation = gql`
  mutation(
    $date: String!
    $stadium: inputStadium!
    $startTime: String!
    $homeTeam: String!
    $awayTeam: String!
    $goalsHomeTeam: Int!
    $goalsAwayTeam: Int!
    $goalScorers: [inputGoalScorer!]
    $uri: String!
  ) {
    post(
      match: {
        date: $date
        stadium: $stadium
        startTime: $startTime
        homeTeam: $homeTeam
        awayTeam: $awayTeam
        goalsHomeTeam: $goalsHomeTeam
        goalsAwayTeam: $goalsAwayTeam
        goalScorers: $goalScorers
        uri: $uri
      }
    ) {
      id
    }
  }
`;
