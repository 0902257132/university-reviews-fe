import { gql } from "@apollo/client";

const GET_ACCOUNT = gql`
  query getAccount($email: String, $passwordUser: String) {
    allAccounts(
      where: { email: $email, AND: { passwordUser: $passwordUser } }
    ) {
      id
      username
    }
  }
`;

const CREATE_ACCOUNT = gql`
  mutation signUp($email: String, $passwordUser: String, $username: String) {
    createAccount(
      data: { email: $email, passwordUser: $passwordUser, username: $username }
    ) {
      id
      username
    }
  }
`;

export const loginQuery = {
  GET_ACCOUNT,
};
export const loginMutation = {
  CREATE_ACCOUNT,
};
