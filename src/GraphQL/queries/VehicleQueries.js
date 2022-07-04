import { gql } from "graphql-request";
import { serverClient } from "../settings";

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