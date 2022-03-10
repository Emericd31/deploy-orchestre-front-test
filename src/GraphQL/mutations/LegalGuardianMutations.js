import { gql, GraphQLClient } from "graphql-request";
import { serverClient } from "../settings";

const client = new GraphQLClient("http://localhost:5003/graphql");

export var addLegalGuardian = async function (
  firstname,
  lastname,
  relationship,
  email,
  mobileNumber
) {
  const token = localStorage.getItem("Token");
  serverClient.setHeader("authorization", "Bearer " + token);
  const variables = {
    firstname: firstname,
    lastname: lastname,
    relationship: relationship,
    email: email,
    mobileNumber: mobileNumber,
  };
  const mutation = gql`
    mutation addLegalGuardian(
      $firstname: String!
      $lastname: String!
      $relationship: String!
      $email: String!
      $mobileNumber: String!
    ) {
      addLegalGuardian(
        firstname: $firstname
        lastname: $lastname
        relationship: $relationship
        email: $email
        mobileNumber: $mobileNumber
      ) {
        id
        statusCode
        message
      }
    }
  `;
  return await serverClient.request(mutation, variables);
};

export var removeLegalGuardian = async function (idLegalGuardian) {
  const variables = {
    idLegalGuardian: idLegalGuardian
  };
  const mutation = gql`
    mutation removeLegalGuardian(
      $idLegalGuardian: Int!
    ) {
      removeLegalGuardian(
        idLegalGuardian: $idLegalGuardian
      ) {
        statusCode
        message
      }
    }
  `;
  return await serverClient.request(mutation, variables);
};