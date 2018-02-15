export const searchClubQL = `
    mutation ($clubName: String!) {
        getClub(clubName: $clubName) {
            name,
            stadiumName,
            capacity
        }
    }
`;
