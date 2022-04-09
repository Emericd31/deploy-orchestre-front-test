import { gql, GraphQLClient } from "graphql-request";
import { serverClient } from "../settings";

const client = new GraphQLClient("http://localhost:5003/graphql");

export var addInstrument = async function (
  marque,
  model,
  musicalFormation,
  serialNumber,
  typeId
) {
  const token = localStorage.getItem("Token");
  serverClient.setHeader("authorization", "Bearer " + token);
  const variables = {
    marque: marque,
    model: model,
    musicalFormation: musicalFormation,
    serialNumber: serialNumber,
    typeId: typeId,
  };
  const mutation = gql`
    mutation addInstrument(
      $marque: String!
      $model: String!
      $musicalFormation: String!
      $serialNumber: String!
      $typeId: Int!
    ) {
      addInstrument(
        marque: $marque
        model: $model
        musicalFormation: $musicalFormation
        serialNumber: $serialNumber
        typeId: $typeId
      ) {
        id
        statusCode
        message
      }
    }
  `;
  return await serverClient.request(mutation, variables);
};

export var modifyInstrument = async function (
  instrumentId,
  marque,
  model,
  musicalFormation,
  serialNumber,
  typeId
) {
  const token = localStorage.getItem("Token");
  serverClient.setHeader("authorization", "Bearer " + token);
  const variables = {
    instrumentId: instrumentId,
    marque: marque,
    model: model,
    musicalFormation: musicalFormation,
    serialNumber: serialNumber,
    typeId: typeId,
  };
  const mutation = gql`
    mutation modifyInstrument(
      $instrumentId: Int!
      $marque: String!
      $model: String!
      $musicalFormation: String!
      $serialNumber: String!
      $typeId: Int!
    ) {
      modifyInstrument(
        instrumentId: $instrumentId
        marque: $marque
        model: $model
        musicalFormation: $musicalFormation
        serialNumber: $serialNumber
        typeId: $typeId
      ) {
        statusCode
        message
      }
    }
  `;
  return await serverClient.request(mutation, variables);
};

export var removeInstrument = async function (instrumentId) {
  const token = localStorage.getItem("Token");
  serverClient.setHeader("authorization", "Bearer " + token);
  const variables = {
    instrumentId: instrumentId,
  };
  const mutation = gql`
    mutation removeInstrument($instrumentId: Int!) {
      removeInstrument(instrumentId: $instrumentId) {
        statusCode
        message
      }
    }
  `;
  return await serverClient.request(mutation, variables);
};
