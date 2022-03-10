import { gql, GraphQLClient } from "graphql-request";
import { serverClient } from "../settings";

const client = new GraphQLClient("http://localhost:5003/graphql");

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