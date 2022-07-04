import { GraphQLClient } from "graphql-request";

// Last online
// export const serverClient = new GraphQLClient("https://deploy-orchestre-api-test.herokuapp.com/graphql/");

// OVH Server
// export const serverClient = new GraphQLClient("http://51.68.126.179:5001/graphql/");

// Local
export const serverClient = new GraphQLClient("http://localhost:5003/graphql");

export const superUserEmail = "admin@admin.com"