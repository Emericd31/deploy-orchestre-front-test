import { gql } from "graphql-request";
import { serverClient } from "../settings";

export var getActualities = async function () {
    const query = gql`
    {
        actualities {
            id
            title
            author
            content
            link
            textLink
            creationDate
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