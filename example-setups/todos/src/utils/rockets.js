import { createClient } from "@kaushik_varanasi/rocketsgraphql-js-sdk";
import Cookies from 'js-cookie';

const config = {
  baseURL: "https://backend-REPLACE",
};

if (Cookies.get("jwt")) {
  console.log("got it");
} else {
   console.log("not got it");
}
const { auth } = createClient(config);

console.log("auth: ", auth);
export { auth };