import { gql } from "graphql-request";
import { serverClient } from "../settings";

export var getEventTypes = async function () {
  const query = gql`
    {
        eventTypes {
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
