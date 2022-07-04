import { gql } from "graphql-request";
import { serverClient } from "../settings";

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

export var getTransportTypes = async function () {
  const query = gql`
    {
      transportTypes {
        id
        type
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
        postalCode,
        startDate, 
        endDate, 
        address,
        addressComplement,
        musicalFormation {
          id 
          value
        }
        eventType,
        phoneNumber, 
        mobileNumber,
        email,
        dresses, 
        transportMode, 
        appointmentAddress, 
        appointmentCity, 
        appointmentPostalCode, 
        appointmentTime, 
        endInscriptionDate
        clientName
        clientFirstname
        clientPhoneNumber
        clientMobileNumber
        clientEmail
        clientFunction
        clientAddress
        clientPostalCode
        clientCity
        diffusionActiveMembers
        diffusionAdministration
        diffusionPublic
        illustrationPath
        diffusionPublic
        publicDescription
        activeMembersInformations
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
        instrument
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

export var getUsersAndPresencesByEvent = async function (eventId) {
  const variable = {
    eventId: eventId
  };
  const query = gql`
    query usersAndPresencesByEvent($eventId: Int!) {
      usersAndPresencesByEvent(eventId: $eventId) {
        resultat {
          item1 {
            id
            firstName
            lastName
            mobileNumber
          } item2 {
            presence
            date
            instrument
          }
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
