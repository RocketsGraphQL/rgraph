import { createClient } from "./extra/rocketgraph-js-sdk";
import Cookies from 'js-cookie';

const config = {
  baseURL: "http://localhost:7000/api",
};

if (Cookies.get("jwt")) {
  console.log("got it");
} else {
   console.log("not got it");
}
const { auth } = createClient(config);

console.log("auth: ", auth);
export { auth };