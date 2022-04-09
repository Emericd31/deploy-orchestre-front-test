import { gql, GraphQLClient } from "graphql-request";
import { serverClient } from "../settings";

const client = new GraphQLClient("http://localhost:5003/graphql");

export var isRegistered = async function (userId) {
  const variable = {
    id: userId,
  };
  const query = gql`
    query isRegistered($id: Int!) {
      isRegistered(id: $id) {
        success
        message
      }
    }
  `;
  return await serverClient.request(query, variable);
};

export var getUsers = async function () {
  const token = localStorage.getItem("Token");
  serverClient.setHeader("authorization", "Bearer " + token);
  const query = gql`
    query users {
      users {
        id
        isRegistered
        email
        firstName
        lastName
        mobileNumber
        userRights {
          right {
            id
            name
          }
        }
      }
    }
  `;
  return await serverClient.request(query);
};

export var getUser = async function (userId) {
  const token = localStorage.getItem("Token");
  serverClient.setHeader("authorization", "Bearer " + token);
  const variable = {
    userId: userId,
  };
  const query = gql`
    query user($userId: Int!) {
      user(userId: $userId) {
        isRegistered
        email
        firstName
        lastName
        id
      }
    }
  `;
  return await serverClient.request(query, variable);
};

export var getCurrentUser = async function () {
  const token = localStorage.getItem("Token");
  serverClient.setHeader("authorization", "Bearer " + token);
  const query = gql`
    query currentUser {
      currentUser {
        firstName
        lastName
        email
        registerDate
        birthday
        birthPlace
        address
        addressComplement
        city 
        postalCode
        phoneNumber
        mobileNumber
      }
    }
  `;
  return await serverClient.request(query);
};

export var getPersonalData = async function () {
  const token = localStorage.getItem("Token");
  serverClient.setHeader("authorization", "Bearer " + token);
  const query = gql`
    query currentUser {
      currentUser {
        firstName
        lastName
        email
        birthday
        address
        addressComplement
        city
        postalCode
        phoneNumber
        mobileNumber
      }
    }
  `;
  return await serverClient.request(query);
}

export var getImageRight = async function () {
  const token = localStorage.getItem("Token");
  serverClient.setHeader("authorization", "Bearer " + token);
  const query = gql`
    query currentUser {
      currentUser {
        imageDiffusionAuthorization
      }
    }
  `;
  return await serverClient.request(query);
}

export var getInitializedProfileCurrentUser = async function () {
  const token = localStorage.getItem("Token");
  serverClient.setHeader("authorization", "Bearer " + token);
  const query = gql`
  query currentUser {
    currentUser {
      initializedProfile
    }
  }`;
  return await serverClient.request(query);
}

export var getMedicalDataCurrentUser = async function () {
  const token = localStorage.getItem("Token");
  serverClient.setHeader("authorization", "Bearer " + token);
  const query = gql`
    query currentUser {
      currentUser {
        bloodType {
          id
          value
        }
        socialSecurityNumber
        medicalTreatment
        foodAllergy
        drugAllergy
        asthma
        allergiesText
        healthProblems
        medicalDevices
        referringDoctorFirstname
        referringDoctorLastname
        referringDoctorMobileNumber
      }
    }
  `;
  return await serverClient.request(query);
};

export var getMyRights = async function () {
  const token = localStorage.getItem("Token");
  serverClient.setHeader("authorization", "Bearer " + token);
  const query = gql`
    query myRights {
      myRights {
        name 
        domain
      }
    }
  `;
  return await serverClient.request(query);
};

export var getRightsByUserId = async function (userId) {
  const token = localStorage.getItem("Token");
  serverClient.setHeader("authorization", "Bearer " + token);
  const variable = {
    userId: userId,
  };
  const query = gql`
    query rightsByUserId($userId: Int!) {
      rightsByUserId(userId: $userId) {
        name
      }
    }
  `;
  return await serverClient.request(query, variable);
};

export var getAllRights = async function () {
  const token = localStorage.getItem("Token");
  serverClient.setHeader("authorization", "Bearer " + token);
  const query = gql`
    query allRights {
      allRights {
        id
        name
      }
    }
  `;
  return await serverClient.request(query);
}