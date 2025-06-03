import { createServer } from "node:http";
import { createYoga } from "graphql-yoga";
import { schema } from "./schema";
import { PubSub } from "graphql-subscriptions";

import db from "./db";

const pubsub = new PubSub();

const yoga = createYoga({
  schema,
  context: { db, pubsub },
});

const server = createServer(yoga);

server.listen(4000, () => {
  console.info("Server is running on http://localhost:4000/graphql");
});
