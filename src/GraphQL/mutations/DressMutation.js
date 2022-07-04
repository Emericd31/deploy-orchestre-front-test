import { gql } from "graphql-request";
import { serverClient } from "../settings";

export var addDress = async function (name, isPersonal) {
  const token = localStorage.getItem("Token");
  serverClient.setHeader("authorization", "Bearer " + token);
  const variable = {
    name: name,
    isPersonal: isPersonal
  };
  const mutation = gql`
    mutation addDress($name: String, $isPersonal: Boolean!) {
        addDress(name: $name, isPersonal: $isPersonal) {
        id
        statusCode
        message
      }
    }
  `;
  return await serverClient.request(mutation, variable);
}

export var editDress = async function (dressId, name, isPersonal) {
  const token = localStorage.getItem("Token");
  serverClient.setHeader("authorization", "Bearer " + token);
  const variable = {
    dressId: dressId,
    name: name,
    isPersonal: isPersonal
  };
  const mutation = gql`
    mutation editDress($dressId: Int!, $name: String, $isPersonal: Boolean!) {
      editDress(dressId: $dressId, name: $name, isPersonal: $isPersonal) {
        statusCode
        message
      }
    }
  `;
  return await serverClient.request(mutation, variable);
}

export var deleteDress = async function (dressId) {
  const token = localStorage.getItem("Token");
  serverClient.setHeader("authorization", "Bearer " + token);
  const variable = {
    dressId: dressId
  };
  const mutation = gql`
    mutation deleteDress($dressId: Int!) {
      deleteDress(dressId: $dressId) {
        statusCode
        message
      }
    }
  `;
  return await serverClient.request(mutation, variable);
}

export var editStocks = async function (dressId, initialAmounts, minimalStocks, actualAmounts) {
  const token = localStorage.getItem("Token");
  serverClient.setHeader("authorization", "Bearer " + token);
  const variable = {
    dressId: dressId,
    initialAmounts: initialAmounts,
    minimalStocks: minimalStocks,
    actualAmounts: actualAmounts
  };
  const mutation = gql`
    mutation editStocks($dressId: Int!, $initialAmounts: [Int!], $minimalStocks: [Int!], $actualAmounts: [Int!]) {
        editStocks(dressId: $dressId, initialAmounts: $initialAmounts, minimalStocks: $minimalStocks, actualAmounts: $actualAmounts) {
        statusCode
        message
      }
    }
  `;
  return await serverClient.request(mutation, variable);
}