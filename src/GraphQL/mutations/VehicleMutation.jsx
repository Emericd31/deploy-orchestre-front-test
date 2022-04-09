import { gql, GraphQLClient } from "graphql-request";
import { serverClient } from "../settings";

const client = new GraphQLClient("http://localhost:5003/graphql");

export var addVehicle = async function (
    marque,
    modele,
    puissance,
    immatriculation
) {
    const token = localStorage.getItem("Token");
    serverClient.setHeader("authorization", "Bearer " + token);
    const variables = {
        marque: marque,
        modele: modele,
        puissance: puissance,
        immatriculation: immatriculation
    };
    const mutation = gql`
      mutation addVehicle(
        $marque: String!
        $modele: String!
        $puissance: String!
        $immatriculation: String!
      ) {
        addVehicle(
            marque: $marque
            modele: $modele
            puissance: $puissance
            immatriculation: $immatriculation
        ) {
          id
          statusCode
          message
        }
      }
    `;
    return await serverClient.request(mutation, variables);
};

export var modifyVehicle = async function (
    idVehicle,
    marque,
    modele,
    puissance,
    immatriculation
) {
    const token = localStorage.getItem("Token");
    serverClient.setHeader("authorization", "Bearer " + token);
    const variables = {
        idVehicle: idVehicle,
        marque: marque,
        modele: modele,
        puissance: puissance,
        immatriculation: immatriculation
    };
    const mutation = gql`
      mutation modifyVehicle(
        $idVehicle: Int!
        $marque: String!
        $modele: String!
        $puissance: String!
        $immatriculation: String!
      ) {
        modifyVehicle(
            idVehicle: $idVehicle
            marque: $marque
            modele: $modele
            puissance: $puissance
            immatriculation: $immatriculation
        ) {
          statusCode
          message
        }
      }
    `;
    return await serverClient.request(mutation, variables);
};

export var removeVehicle = async function (idVehicle) {
    const variables = {
        idVehicle: idVehicle
    };
    const mutation = gql`
        mutation removeVehicle(
            $idVehicle: Int!
        ) {
            removeVehicle(
            idVehicle: $idVehicle
        ) {
          statusCode
          message
        }
      }
    `;
    return await serverClient.request(mutation, variables);
};