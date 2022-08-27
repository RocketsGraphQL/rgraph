import { createClient } from "@rocketgraphql/rocketgraph-js-sdk";

const config = {
  baseURL: "https://backend-xxxxx.rocketgraph.app/api",
};

const { auth } = createClient(config);

export { auth };