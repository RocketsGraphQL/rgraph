import { createClient } from "@kaushik_varanasi/rocketsgraphql-js-sdk";
import Cookies from 'js-cookie';

const config = {
  baseURL: "https://backend-ZDFEY9G.rocketgraph.app/api",
};

if (Cookies.get("jwt")) {
  console.log("got it");
} else {
   console.log("not got it");
}
const { auth } = createClient(config);

console.log("auth: ", auth);
export { auth };