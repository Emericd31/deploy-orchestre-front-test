import { gql, GraphQLClient } from "graphql-request";
import { serverClient } from "../settings";

const client = new GraphQLClient("http://localhost:5003/graphql");

export var getMyVehicles = async function () {
    const query = gql`
    {
        vehiclesByUser {
            id
            marque
            modele
            puissance
            immatriculation
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