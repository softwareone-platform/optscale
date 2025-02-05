import { gql } from "@apollo/client";

const GET_ORGANIZATION_ALLOWED_ACTIONS = gql`
  query OrganizationAllowedActions($requestParams: OrganizationAllowedActionsRequestParams) {
    organizationAllowedActions(requestParams: $requestParams)
  }
`;

const CREATE_TOKEN = gql`
  mutation CreateToken($email: String!, $password: String, $code: String) {
    token(email: $email, password: $password, code: $code) {
      token
      user_id
      user_email
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($email: String!, $password: String!, $name: String!) {
    user(email: $email, password: $password, name: $name) {
      token
      user_id
      user_email
    }
  }
`;

const SIGN_IN = gql`
  mutation SignIn($provider: String!, $token: String!, $tenantId: String, $redirectUri: String) {
    signIn(provider: $provider, token: $token, tenantId: $tenantId, redirectUri: $redirectUri) {
      token
      user_id
      user_email
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $params: UpdateUserParams!) {
    updateUser(id: $id, params: $params) {
      token
      user_id
      user_email
    }
  }
`;

export { GET_ORGANIZATION_ALLOWED_ACTIONS, CREATE_TOKEN, CREATE_USER, SIGN_IN, UPDATE_USER };
