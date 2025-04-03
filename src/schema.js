import { createSchema } from "graphql-yoga";
import { readFileSync } from "fs";
import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";
import User from "./resolvers/User";
import Post from "./resolvers/Post";
import Comment from "./resolvers/Comment";

const typeDefs = readFileSync("./src/schema.graphql", "utf8");

export const schema = createSchema({
  typeDefs,

  resolvers: {
    Query,
    Mutation,
    User,
    Post,
    Comment,
  },
});
