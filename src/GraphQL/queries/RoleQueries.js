import { gql } from "graphql-request";
import { serverClient } from "../settings";

export var getRoles = async function () {
  const query = gql`
    {
      roles {
        id
        name
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

export var getRightsByRoleId = async function (roleId) {
  const variable = {
    id: roleId,
  };
  const token = localStorage.getItem("Token");
  const query = gql`
    query role($id: Int!) {
      role(id: $id) {
        rolesRights {
          right {
            id
            name
          }
        }
      }
    }
  `;
  const requestHeaders = {
    authorization: "Bearer " + token,
  };

  const data = await serverClient.request(query, variable, requestHeaders);
  return data;
};

export var getAllRights = async function () {
  const variable = {};
  const token = localStorage.getItem("Token");
  const query = gql`
		query roles{
				rights() {
					id
					name
				}
			}
	`;
  const requestHeaders = {
    authorization: "Bearer " + token,
  };

  const data = await serverClient.request(query, variable, requestHeaders);
  return data;
};
