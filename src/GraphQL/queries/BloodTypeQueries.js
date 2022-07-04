import { gql } from "graphql-request";
import { serverClient } from "../settings";

export var getBloodTypes = async function () {
  const query = gql`
    {
      bloodTypes {
        id
        value
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
