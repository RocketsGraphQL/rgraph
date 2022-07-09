import { createClient } from "@rocketgraphql/rocketgraph-js-sdk";
import Cookies from 'js-cookie';

const config = {
  baseURL: "http://localhost:7000/api",
};

console.log("loading from extra");

if (Cookies.get("jwt")) {
  console.log("got it", Cookies.get("jwt"));
} else {
   console.log("not got it");
}
const { auth } = createClient(config);

console.log("auth: ", auth);
export { auth };