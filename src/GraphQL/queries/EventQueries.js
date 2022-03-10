import { gql, GraphQLClient } from "graphql-request";
import { serverClient } from "../settings";

const client = new GraphQLClient("http://localhost:5003/graphql");

export var getMusicalFormations = async function () {
  const query = gql`
    {
        musicalFormations {
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

export var getEventsGeneralInfos = async function () {
  const query = gql`
    {
      events {
        id, 
        entitled,
        city, 
        startDate, 
        endDate, 
        transportMode, 
        appointmentAddress, 
        appointmentCity, 
        appointmentPostalCode, 
        appointmentTime, 
        endInscriptionDate
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
}

export var getMyPresence = async function (eventId) {
  const variable = {
    eventId: eventId,
  };
  const query = gql`
    query myPresence($eventId: Int!) {
      myPresence(eventId: $eventId) {
        presence
      }
    }
  `;
  const token = localStorage.getItem("Token");
  const requestHeaders = {
    authorization: "Bearer " + token,
  };

  const data = await serverClient.request(query, variable, requestHeaders);
  return data;
}

export var getPresence = async function (eventId) {
  const variable = {
    eventId: eventId
  }; 
  const query = gql`
    query presence($eventId: Int!) {
      presence(eventId: $eventId) {
        statusCode
        present
        absent
        nonRenseigne
      }
    }
  `;
  const token = localStorage.getItem("Token"); 
  const requestHeaders = {
    authorization: "Bearer " + token 
  }; 

  const data = await serverClient.request(query, variable, requestHeaders); 
  return data; 
}

export var getEventNames = async function () {
  const variable = {};
  const query = gql`
    query eventNames {
      eventNames {
        resultat {
          item1
          item2
        }
      }
    }  
  `;
  const token = localStorage.getItem("Token"); 
  const requestHeaders = {
    authorization: "Bearer " + token
  }; 

  const data = await serverClient.request(query, variable, requestHeaders); 
  return data; 
}
