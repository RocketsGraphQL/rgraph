import { createClient } from "@kaushik_varanasi/rocketsgraphql-js-sdk";

const config = {
  baseURL: "https://hasura-6khqdzs.rocketgraph.app/api",
};

const { auth } = createClient(config);

export { auth };