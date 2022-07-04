import { gql } from "graphql-request";
import { serverClient } from "../settings";

export var getLegalGuardiansByUser = async function () {
  const query = gql`
    {
      legalGuardiansByUser {
        id
        firstname
        lastname
        email
        relationship
        mobileNumber
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