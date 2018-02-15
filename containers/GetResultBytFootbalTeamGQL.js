export const GetResultBytFootbalTeam = `
query ($date: String!, $stadiumName: String!, $capacity: Int!, $name: String!) {
    matchBasedOnFootballTeam(date: $date, stadiumName: $stadiumName, capacity: $capacity, name: $name) {
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
