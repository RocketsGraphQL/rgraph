import { createClient } from "@rocketgraphql/rocketgraph-js-sdk";
import Cookies from 'js-cookie';

const config = {
  baseURL: "https://backend-0FJMZME.rocketgraph.app/auth",
};

const { auth } = createClient(config);

export { auth };