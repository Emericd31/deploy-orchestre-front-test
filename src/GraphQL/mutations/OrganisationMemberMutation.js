import { gql } from "graphql-request";
import { serverClient } from "../settings";

export var addOrganisationMember = async function (
    firstname,
    lastname,
    relationship,
    email,
    mobileNumber,
    eventId
) {
    const token = localStorage.getItem("Token");
    serverClient.setHeader("authorization", "Bearer " + token);
    const variables = {
        firstname: firstname,
        lastname: lastname,
        relationship: relationship,
        email: email,
        mobileNumber: mobileNumber,
        eventId: eventId
    };
    const mutation = gql`
    mutation addOrganisationMember(
      $firstname: String!
      $lastname: String!
      $relationship: String!
      $email: String!
      $mobileNumber: String!
      $eventId: Int!
    ) {
        addOrganisationMember(
        firstname: $firstname
        lastname: $lastname
        relationship: $relationship
        email: $email
        mobileNumber: $mobileNumber
        eventId: $eventId
      ) {
        id
        statusCode
        message
      }
    }
  `;
    return await serverClient.request(mutation, variables);
};

export var modifyOrganisationMember = async function (
    idOrganisationMember,
    firstname,
    lastname,
    relationship,
    email,
    mobileNumber
) {
    const token = localStorage.getItem("Token");
    serverClient.setHeader("authorization", "Bearer " + token);
    const variables = {
        idOrganisationMember: idOrganisationMember,
        firstname: firstname,
        lastname: lastname,
        relationship: relationship,
        email: email,
        mobileNumber: mobileNumber,
    };
    const mutation = gql`
    mutation modifyOrganisationMember(
      $idOrganisationMember: Int!
      $firstname: String!
      $lastname: String!
      $relationship: String!
      $email: String!
      $mobileNumber: String!
    ) {
        modifyOrganisationMember(
        idOrganisationMember: $idOrganisationMember
        firstname: $firstname
        lastname: $lastname
        relationship: $relationship
        email: $email
        mobileNumber: $mobileNumber
      ) {
        statusCode
        message
      }
    }
  `;
    return await serverClient.request(mutation, variables);
};

export var removeOrganisationMember = async function (idOrganisationMember) {
    const variables = {
        idOrganisationMember: idOrganisationMember
    };
    const mutation = gql`
    mutation removeOrganisationMember(
      $idOrganisationMember: Int!
    ) {
        removeOrganisationMember(
        idOrganisationMember: $idOrganisationMember
      ) {
        statusCode
        message
      }
    }
  `;
    return await serverClient.request(mutation, variables);
};