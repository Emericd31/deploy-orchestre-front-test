import { gql } from "graphql-request";
import { serverClient } from "../settings";

export var verifyUser = async function (token) {
  const variable = {
    token: token,
  };
  const mutation = gql`
    mutation verifyUser($token: String!) {
      verifyUser(token: $token) {
        statusCode
        message
      }
    }
  `;
  return await serverClient.request(mutation, variable);
};

export var addUser = async function (firstname, lastname, email, password) {
  const variable = {
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: password
  };
  const mutation = gql`
    mutation addUser(
      $firstname: String!
      $lastname: String!
      $email: String!
      $password: String!) {
      addUser(
        firstname: $firstname
        lastname: $lastname
        email: $email
        password: $password
      ) {
        statusCode
        message
        id
      }
    }
  `;
  return await serverClient.request(mutation, variable);
};

export var loginUser = async function (email, password) {
  const variable = {
    email: email,
    password: password
  };
  const mutation = gql`
    mutation login(
      $email: String!
      $password: String!) {
      login(
        email: $email
        password: $password) {
        statusCode
        message
        token
        id
      }
    }
  `;
  return await serverClient.request(mutation, variable);
};

export var deleteUser = async function (userId) {
  const token = localStorage.getItem("Token");
  serverClient.setHeader("authorization", "Bearer " + token);
  const variable = {
    userId: userId,
  };
  const mutation = gql`
    mutation deleteUser($userId: Int!) {
      deleteUser(userId: $userId) {
        statusCode
        message
      }
    }
  `;
  return await serverClient.request(mutation, variable);
};

export var modifyUserPublic = async function (userId, firstName, lastName) {
  const token = localStorage.getItem("Token");
  serverClient.setHeader("authorization", "Bearer " + token);
  const variable = {
    userId: userId,
    firstName: firstName,
    lastName: lastName,
  };
  const mutation = gql`
    mutation modifyUserPublic(
      $userId: Int!
      $firstName: String!
      $lastName: String!
    ) {
      modifyUserPublic(
        userId: $userId
        firstName: $firstName
        lastName: $lastName
      ) {
        statusCode
        message
      }
    }
  `;
  return await serverClient.request(mutation, variable);
};

export var modifyRoleUser = async function (userId, roleId) {
  const token = localStorage.getItem("Token");
  serverClient.setHeader("authorization", "Bearer " + token);
  const variable = {
    userId: userId,
    roleId: roleId,
  };
  const mutation = gql`
    mutation modifyRoleUser($userId: Int!, $roleId: Int!) {
      modifyRoleUser(userId: $userId, roleId: $roleId) {
        statusCode
        message
      }
    }
  `;
  return await serverClient.request(mutation, variable);
};

export var modifyCurrentUserInfo = async function (firstName, lastName, birthday, birthplace, address, addressComplement, city, postalCode, phoneNumber, mobileNumber) {
  const token = localStorage.getItem("Token");
  serverClient.setHeader("authorization", "Bearer " + token);
  const variable = {
    firstName: firstName,
    lastName: lastName,
    birthday: birthday,
    birthplace: birthplace,
    address: address,
    addressComplement: addressComplement,
    city: city,
    postalCode: postalCode,
    phoneNumber: phoneNumber,
    mobileNumber: mobileNumber
  };
  const mutation = gql`
    mutation modifyCurrentUserInfo($firstName: String!, $lastName: String!, $birthday: String!, $birthplace: String!, $address: String!, $addressComplement: String!, $city: String!, $postalCode: String!, $phoneNumber: String!, $mobileNumber: String!) {
      modifyCurrentUserInfo(firstName: $firstName, lastName: $lastName, birthday: $birthday, birthplace: $birthplace, address: $address, addressComplement: $addressComplement, 
        city: $city, postalCode: $postalCode, phoneNumber: $phoneNumber, mobileNumber: $mobileNumber) {
        statusCode
        message
      }
    }
  `;
  return await serverClient.request(mutation, variable);
};

export var modifyCurrentUserHealthData = async function (bloodTypeId, socialSecurityNumber, medicalTreatment, foodAllergy, drugAllergy, asthma,
  allergies, healthProblems, medicalDevices, referringDoctorFirstname, referringDoctorLastname, referringDoctorMobileNumber) {
  const token = localStorage.getItem("Token");
  const variable = {
    bloodTypeId: bloodTypeId,
    socialSecurityNumber: socialSecurityNumber,
    medicalTreatment: medicalTreatment,
    foodAllergy: foodAllergy,
    drugAllergy: drugAllergy,
    asthma: asthma,
    allergies: allergies,
    healthProblems: healthProblems,
    medicalDevices: medicalDevices,
    referringDoctorFirstname: referringDoctorFirstname,
    referringDoctorLastname: referringDoctorLastname,
    referringDoctorMobileNumber: referringDoctorMobileNumber
  };
  const mutation = gql`
    mutation modifyCurrentUserHealthData($bloodTypeId: Int!, $socialSecurityNumber: String, $medicalTreatment: Boolean!, $foodAllergy: Boolean!, 
        $drugAllergy: Boolean!, $asthma : Boolean!, $allergies: String, $healthProblems: String, $medicalDevices: String, $referringDoctorFirstname: String, 
        $referringDoctorLastname: String, $referringDoctorMobileNumber: String
        ) {
      modifyCurrentUserHealthData(bloodTypeId: $bloodTypeId, socialSecurityNumber: $socialSecurityNumber, medicalTreatment: $medicalTreatment, 
        foodAllergy: $foodAllergy, drugAllergy: $drugAllergy, asthma: $asthma, allergies: $allergies, healthProblems: $healthProblems, 
        medicalDevices: $medicalDevices, referringDoctorFirstname: $referringDoctorFirstname, referringDoctorLastname: $referringDoctorLastname, 
        referringDoctorMobileNumber: $referringDoctorMobileNumber) {
          statusCode
          message
      }
    }
  `;
  return await serverClient.request(mutation, variable);
}

export var modifyCurrentUserImageDiffusionAuthorization = async function (authorization) {
  const token = localStorage.getItem("Token");
  const variable = {
    authorization: authorization
  };
  const mutation = gql`
    mutation modifyCurrentUserImageDiffusionAuthorization($authorization: Boolean!) {
      modifyCurrentUserImageDiffusionAuthorization(authorization: $authorization) {
        statusCode
        message
      }
    }
  `;
  return await serverClient.request(mutation, variable);
}

export var assignRightToUser = async function (idUser, idRight) {
  const token = localStorage.getItem("Token");
  serverClient.setHeader("authorization", "Bearer " + token);
  const variable = {
    idUser: idUser,
    idRight: idRight
  };
  const mutation = gql`
    mutation assignRightToUser($idUser: Int!, $idRight: Int!) {
      assignRightToUser(idUser: $idUser, idRight: $idRight) {
        statusCode
        message
      }
    }
  `;
  return await serverClient.request(mutation, variable);
}

export var removeRightFromUser = async function (idUser, idRight) {
  const token = localStorage.getItem("Token");
  serverClient.setHeader("authorization", "Bearer " + token);
  const variable = {
    idUser: idUser,
    idRight: idRight
  };
  const mutation = gql`
    mutation removeRightFromUser($idUser: Int!, $idRight: Int!) {
      removeRightFromUser(idUser: $idUser, idRight: $idRight) {
        statusCode
        message
      }
    }
  `;
  return await serverClient.request(mutation, variable);
}

export var assignTypeToUser = async function (userId, typeId) {
  const token = localStorage.getItem("Token");
  serverClient.setHeader("authorization", "Bearer " + token);
  const variable = {
    userId: userId,
    typeId: typeId
  };
  const mutation = gql`
    mutation assignTypeToUser($userId: Int!, $typeId: Int!) {
      assignTypeToUser(userId: $userId, typeId: $typeId) {
        statusCode
        message
      }
    }
  `;
  return await serverClient.request(mutation, variable);
}

export var removeTypeFromUser = async function (userId, typeId) {
  const token = localStorage.getItem("Token");
  serverClient.setHeader("authorization", "Bearer " + token);
  const variable = {
    userId: userId,
    typeId: typeId
  };
  const mutation = gql`
    mutation removeTypeFromUser($userId: Int!, $typeId: Int!) {
      removeTypeFromUser(userId: $userId, typeId: $typeId) {
        statusCode
        message
      }
    }
  `;
  return await serverClient.request(mutation, variable);
}

export var confirmProfile = async function () {
  const token = localStorage.getItem("Token");
  serverClient.setHeader("authorization", "Bearer " + token);
  const variable = {};
  const mutation = gql`
  mutation confirmProfileFilled() {
    confirmProfileFilled {
      statusCode 
      message
    }
  }
  `;
  return await serverClient.request(mutation, variable);
};

export var modifyCurrentUserEmail = async function (newEmail, password) {
  const token = localStorage.getItem("Token");
  serverClient.setHeader("authorization", "Bearer " + token);
  const variable = {
    newEmail: newEmail,
    password: password,
  };
  const mutation = gql`
    mutation modifyCurrentUserEmail($newEmail: String!, $password: String!) {
      modifyCurrentUserEmail(newEmail: $newEmail, password: $password) {
        statusCode
        message
      }
    }
  `;
  return await serverClient.request(mutation, variable);
};

export var sendModifyPasswordMessage = async function (email) {
  const variable = {
    email: email,
  };
  const mutation = gql`
    mutation sendModifyPasswordMessage($email: String!) {
      sendModifyPasswordMessage(email: $email) {
        statusCode
        message
      }
    }
  `;
  return await serverClient.request(mutation, variable);
};

export var checkUserTokenWithEmailClaim = async function (token) {
  const variable = {
    token: token,
  };
  const mutation = gql`
    mutation checkUserTokenWithEmailClaim($token: String!) {
      checkUserTokenWithEmailClaim(token: $token) {
        statusCode
        message
      }
    }
  `;
  return await serverClient.request(mutation, variable);
};

export var modifyPassword = async function (oldPassword, newPassword) {
  const token = localStorage.getItem("Token");
  serverClient.setHeader("authorization", "Bearer " + token);
  const variable = {
    token: localStorage.getItem("Token"),
    oldPassword: oldPassword,
    newPassword: newPassword,
  };
  const mutation = gql`
    mutation modifyPassword(
      $token: String!
      $oldPassword: String!
      $newPassword: String!
    ) {
      modifyPassword(
        token: $token
        oldPassword: $oldPassword
        newPassword: $newPassword
      ) {
        statusCode
        message
      }
    }
  `;
  return await serverClient.request(mutation, variable);
};