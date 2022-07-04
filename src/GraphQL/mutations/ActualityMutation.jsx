import { gql } from "graphql-request";
import { serverClient } from "../settings";

export var addActuality = async function (
  title,
  content,
  textLink,
  link
) {
  const token = localStorage.getItem("Token");
  serverClient.setHeader("authorization", "Bearer " + token);
  const variables = {
    title: title,
    content: content,
    textLink: textLink,
    link: link
  };
  const mutation = gql`
    mutation addActuality(
      $title: String!
      $content: String!
      $textLink: String!
      $link: String!
    ) {
        addActuality(
        title: $title
        content: $content
        textLink: $textLink
        link: $link
      ) {
        id
        statusCode
        message
      }
    }
  `;
  return await serverClient.request(mutation, variables);
};