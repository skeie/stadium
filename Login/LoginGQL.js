import gql from 'graphql-tag';

export const signup = gql`
    mutation($email: String!, $password: String!, $name: String!) {
        signup(email: $email, password: $password, name: $name) {
            token
        }
    }
`;

export const login = gql`
    mutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
        }
    }
`;
