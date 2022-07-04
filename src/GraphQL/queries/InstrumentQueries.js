import { gql } from "graphql-request";
import { serverClient } from "../settings";

export var getInstrumentsByUser = async function () {
  const query = gql`
    {
      instrumentsByUser {
        id
        marque
        model
        musicalFormation
        serialNumber
        type {
            id 
            type
        }
      }
    }
  `;
  const variables = {};
  const token = localStorage.getItem("Token");
  const requestHeaders = {
    authorization: "Bearer " + token,
  };

  const data = await serverClient.request(query, variables, requestHeaders);
  return data;
};
