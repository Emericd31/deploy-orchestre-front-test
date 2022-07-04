import { gql } from "graphql-request";
import { serverClient } from "../settings";

export var addEvent = async function (event) {
  const variable = {
    input: event,
  };
  const mutation = gql`
      mutation addEvent($input: EventInput!) {
        addEvent(input: $input) {
            id
            statusCode
            message
        }
      }
    `;
  return await serverClient.request(mutation, variable);
};

export var modifyEventGeneralData = async function (eventId, musicalFormationId, startDate, endDate, intitule, address, addressComplement, postalCode, city, phoneNumber, mobileNumber, email, eventType) {
  const token = localStorage.getItem("Token");
  serverClient.setHeader("authorization", "Bearer " + token);
  const variable = {
    eventId: eventId,
    musicalFormationId: musicalFormationId,
    startDate: startDate,
    endDate: endDate,
    intitule: intitule,
    address: address, 
    addressComplement: addressComplement,
    postalCode: postalCode, 
    city: city, 
    phoneNumber: phoneNumber, 
    mobileNumber: mobileNumber,
    email: email,
    eventType: eventType
  };
  const mutation = gql`
    mutation modifyEventGeneralData($eventId: Int!, $musicalFormationId: Int!, $startDate: DateTime!, $endDate: DateTime!, $intitule: String, $address: String, $addressComplement: String, $postalCode: String, $city: String, $phoneNumber: String, $mobileNumber: String, $email: String, $eventType: String) {
      modifyEventGeneralData(
        eventId: $eventId, 
        musicalFormationId: $musicalFormationId, 
        startDate: $startDate, 
        endDate: $endDate, 
        intitule: $intitule, 
        address: $address, 
        addressComplement: $addressComplement, 
        postalCode: $postalCode, 
        city: $city, 
        phoneNumber: $phoneNumber, 
        mobileNumber: $mobileNumber, 
        email: $email, 
        eventType: $eventType) {
        statusCode
        message
      }
    }
  `;
  return await serverClient.request(mutation, variable);
}

export var modifyEventClientData = async function (eventId, clientFirstname, clientLastname, clientAddress, clientPostalCode, clientCity, clientFunction, clientPhoneNumber, clientMobileNumber, clientEmail) {
  const token = localStorage.getItem("Token");
  serverClient.setHeader("authorization", "Bearer " + token);
  const variable = {
    eventId: eventId,
    clientFirstname: clientFirstname,
    clientLastname: clientLastname,
    clientAddress: clientAddress,
    clientPostalCode: clientPostalCode,
    clientCity: clientCity, 
    clientFunction: clientFunction,
    clientPhoneNumber: clientPhoneNumber, 
    clientMobileNumber: clientMobileNumber, 
    clientEmail: clientEmail
  };
  const mutation = gql`
    mutation modifyEventClientData($eventId: Int!, $clientFirstname: String, $clientLastname: String, $clientAddress: String, $clientPostalCode: String, $clientCity: String, $clientFunction: String, $clientPhoneNumber: String, $clientMobileNumber: String, $clientEmail: String) {
      modifyEventClientData(
        eventId: $eventId, 
        clientFirstname: $clientFirstname, 
        clientLastname: $clientLastname, 
        clientAddress: $clientAddress, 
        clientPostalCode: $clientPostalCode, 
        clientCity: $clientCity, 
        clientFunction: $clientFunction, 
        clientPhoneNumber: $clientPhoneNumber, 
        clientMobileNumber: $clientMobileNumber, 
        clientEmail: $clientEmail) {
        statusCode
        message
      }
    }
  `;
  return await serverClient.request(mutation, variable);
}

export var modifyEventLogisticProgram = async function (eventId, appointmentAddress, appointmentCity, appointmentPostalCode, appointmentTime, transportType, dresses) {
  const token = localStorage.getItem("Token");
  serverClient.setHeader("authorization", "Bearer " + token);
  const variable = {
    eventId: eventId,
    appointmentAddress: appointmentAddress,
    appointmentCity: appointmentCity,
    appointmentPostalCode: appointmentPostalCode,
    appointmentTime: appointmentTime,
    transportType: transportType,
    dresses: dresses
  };
  const mutation = gql`
    mutation modifyEventLogisticProgram($eventId: Int!, $appointmentAddress: String, $appointmentCity: String, $appointmentPostalCode: String, $appointmentTime: DateTime!, $transportType: String, $dresses: String) {
      modifyEventLogisticProgram(
        eventId: $eventId, 
        appointmentAddress: $appointmentAddress, 
        appointmentCity: $appointmentCity, 
        appointmentPostalCode: $appointmentPostalCode, 
        appointmentTime: $appointmentTime,
        transportType: $transportType,
        dresses: $dresses) {
        statusCode
        message
      }
    }
  `;
  return await serverClient.request(mutation, variable);
}

export var modifyEventDiffusionData = async function (eventId, illustrationPath, publicDescription, activeMembersInformations, diffusionActiveMembers, diffusionAdministration, diffusionPublic, endInscriptionDate) {
  const token = localStorage.getItem("Token");
  serverClient.setHeader("authorization", "Bearer " + token);
  const variable = {
    eventId: eventId,
    illustrationPath: illustrationPath,
    publicDescription: publicDescription,
    activeMembersInformations: activeMembersInformations,
    diffusionActiveMembers: diffusionActiveMembers,
    diffusionAdministration: diffusionAdministration,
    diffusionPublic: diffusionPublic,
    endInscriptionDate: endInscriptionDate
  };
  const mutation = gql`
    mutation modifyEventDiffusionData($eventId: Int!, $illustrationPath: String, $publicDescription: String, $activeMembersInformations: String, $diffusionActiveMembers: Boolean!, $diffusionAdministration: Boolean!, $diffusionPublic: Boolean!, $endInscriptionDate: DateTime!) {
      modifyEventDiffusionData(
        eventId: $eventId, 
        illustrationPath: $illustrationPath, 
        publicDescription: $publicDescription, 
        activeMembersInformations: $activeMembersInformations, 
        diffusionActiveMembers: $diffusionActiveMembers,
        diffusionAdministration: $diffusionAdministration,
        diffusionPublic: $diffusionPublic,
        endInscriptionDate: $endInscriptionDate) {
        statusCode
        message
      }
    }
  `;
  return await serverClient.request(mutation, variable);
}

export var setPresence = async function (eventId, presence) {
  const token = localStorage.getItem("Token");
  serverClient.setHeader("authorization", "Bearer " + token);
  const variable = {
    eventId: eventId,
    presence: presence
  };
  const mutation = gql`
    mutation setPresence($eventId: Int!, $presence: String) {
      setPresence(eventId: $eventId, presence: $presence) {
        statusCode
        message
      }
    }
  `;
  return await serverClient.request(mutation, variable);
}

export var setInstrumentEvent = async function (eventId, instrument) {
  const token = localStorage.getItem("Token");
  serverClient.setHeader("authorization", "Bearer " + token);
  const variable = {
    eventId: eventId,
    instrument: instrument
  };
  const mutation = gql`
    mutation setInstrumentEvent($eventId: Int!, $instrument: String) {
      setInstrumentEvent(eventId: $eventId, instrument: $instrument) {
        statusCode
        message
      }
    }
  `;
  return await serverClient.request(mutation, variable);
}

export var addEventType = async function (type) {
  const token = localStorage.getItem("Token");
  serverClient.setHeader("authorization", "Bearer " + token);
  const variable = {
    type: type
  };
  const mutation = gql`
    mutation addEventType($type: String) {
      addEventType(type: $type) {
        id
        statusCode
        message
      }
    }
  `;
  return await serverClient.request(mutation, variable);
}

export var modifyEventType = async function (eventTypeId, type) {
  const token = localStorage.getItem("Token");
  serverClient.setHeader("authorization", "Bearer " + token);
  const variable = {
    eventTypeId: eventTypeId,
    type: type
  };
  const mutation = gql`
    mutation modifyEventType($eventTypeId: Int!, $type: String) {
      modifyEventType(eventTypeId: $eventTypeId, type: $type) {
        statusCode
        message
      }
    }
  `;
  return await serverClient.request(mutation, variable);
}

export var deleteEventType = async function (eventTypeId) {
  const token = localStorage.getItem("Token");
  serverClient.setHeader("authorization", "Bearer " + token);
  const variable = {
    eventTypeId: eventTypeId
  };
  const mutation = gql`
    mutation deleteEventType($eventTypeId: Int!) {
      deleteEventType(eventTypeId: $eventTypeId) {
        statusCode
        message
      }
    }
  `;
  return await serverClient.request(mutation, variable);
}

export var addMusicalFormation = async function (value) {
  const token = localStorage.getItem("Token");
  serverClient.setHeader("authorization", "Bearer " + token);
  const variable = {
    value: value
  };
  const mutation = gql`
    mutation addMusicalFormation($value: String) {
      addMusicalFormation(value: $value) {
        id
        statusCode
        message
      }
    }
  `;
  return await serverClient.request(mutation, variable);
}

export var modifyMusicalFormation = async function (musicalFormationId, value) {
  const token = localStorage.getItem("Token");
  serverClient.setHeader("authorization", "Bearer " + token);
  const variable = {
    musicalFormationId: musicalFormationId,
    value: value
  };
  const mutation = gql`
    mutation modifyMusicalFormation($musicalFormationId: Int!, $value: String) {
      modifyMusicalFormation(musicalFormationId: $musicalFormationId, value: $value) {
        statusCode
        message
      }
    }
  `;
  return await serverClient.request(mutation, variable);
}

export var deleteMusicalFormation = async function (musicalFormationId) {
  const token = localStorage.getItem("Token");
  serverClient.setHeader("authorization", "Bearer " + token);
  const variable = {
    musicalFormationId: musicalFormationId
  };
  const mutation = gql`
    mutation deleteMusicalFormation($musicalFormationId: Int!) {
      deleteMusicalFormation(musicalFormationId: $musicalFormationId) {
        statusCode
        message
      }
    }
  `;
  return await serverClient.request(mutation, variable);
}

export var addTransportType = async function (type) {
  const token = localStorage.getItem("Token");
  serverClient.setHeader("authorization", "Bearer " + token);
  const variable = {
    type: type
  };
  const mutation = gql`
    mutation addTransportType($type: String) {
      addTransportType(type: $type) {
        id
        statusCode
        message
      }
    }
  `;
  return await serverClient.request(mutation, variable);
}

export var modifyTransportType = async function (transportTypeId, type) {
  const token = localStorage.getItem("Token");
  serverClient.setHeader("authorization", "Bearer " + token);
  const variable = {
    transportTypeId: transportTypeId,
    type: type
  };
  const mutation = gql`
    mutation modifyTransportType($transportTypeId: Int!, $type: String) {
      modifyTransportType(transportTypeId: $transportTypeId, type: $type) {
        statusCode
        message
      }
    }
  `;
  return await serverClient.request(mutation, variable);
}

export var deleteTransportType = async function (transportTypeId) {
  const token = localStorage.getItem("Token");
  serverClient.setHeader("authorization", "Bearer " + token);
  const variable = {
    transportTypeId: transportTypeId
  };
  const mutation = gql`
    mutation deleteTransportType($transportTypeId: Int!) {
      deleteTransportType(transportTypeId: $transportTypeId) {
        statusCode
        message
      }
    }
  `;
  return await serverClient.request(mutation, variable);
}