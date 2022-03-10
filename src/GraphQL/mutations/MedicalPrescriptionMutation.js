import { gql, GraphQLClient } from "graphql-request";
import { serverClient } from "../settings";

const client = new GraphQLClient("http://localhost:5003/graphql");

export var addMedicalPrescription = async function (file) {
  const token = localStorage.getItem("Token");
  serverClient.setHeader("authorization", "Bearer " + token);
  const variable = {
    file: file
  };
  const mutation = gql`
    mutation addMedicalPrescription($file: Upload!) {
      addMedicalPrescription(file: $file) {
        id
        statusCode
        message
      }
    }
    `;
  return await client.request(mutation, variable);
}

export var deleteMedicalPrescription = async function (medicalPrescriptionId) {
  const token = localStorage.getItem("Token"); 
  serverClient.setHeader("authorization", "Bearer " + token); 
  const variable = {
    medicalPrescriptionId: medicalPrescriptionId
  }; 
  const mutation = gql`
  mutation deleteMedicalPrescription($medicalPrescriptionId: Int!) {
    deleteMedicalPrescription(medicalPrescriptionId: $medicalPrescriptionId) {
      statusCode
      message
    }
  }
  `;
  return await serverClient.request(mutation, variable); 
}