import { gql } from "graphql-request";
import { serverClient } from "../settings";

export var getDresses = async function () {
    const query = gql`
    {
        dresses {
            id
            name
            isPersonal
            dressStocks {
                id
                isMale
                initialAmount
                actualAmount
                minimalStock
                size
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

export var getUsersByDressAndSize = async function (dressId, size, isMale) {
    const variables = {
        dressId: dressId,
        size: size,
        isMale: isMale
    };
    const query = gql`
      query usersByDressAndSize($dressId: Int!, $size: Int!,  $isMale: Boolean!) {
        usersByDressAndSize(dressId: $dressId, size: $size, isMale: $isMale) {
            id
            firstName
            lastName
        }
      }
    `;
    const token = localStorage.getItem("Token");
    const requestHeaders = {
        authorization: "Bearer " + token
    };

    const data = await serverClient.request(query, variables, requestHeaders);
    return data;
}

export var getDressByUser = async function (userId) {
    const variables = {
        userId: userId
    };
    const query = gql`
      query dressByUser($userId: Int!) {
        dressByUser(userId: $userId) {
            isMale
            size
            amount
            dress {
                name
            }
        }
      }
    `;
    const token = localStorage.getItem("Token");
    const requestHeaders = {
        authorization: "Bearer " + token
    };

    const data = await serverClient.request(query, variables, requestHeaders);
    return data;
}