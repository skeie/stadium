export const signup = `mutation($email: String!, $password: String!, $username: String!) {
    signup(email: $email, password: $password, username: $username) {
      token
      user {
        id
      }
    }
  }`;

export const login = `mutation($name: String!, $password: String!) {
    login(name: $name, password: $password) {
      token,
      name,
      password,
    }
  }`;
