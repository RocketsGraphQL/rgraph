import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../utils/rockets";

export function Signup(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    // login
    try {
      const {providerUrl, redirectUrl, success} = await auth.signIn({email, password, provider: "google"});
      console.log("github data: ", providerUrl, redirectUrl, success);
      window.location.href = providerUrl;
    } catch (error) {
      alert("error signing up");
      console.error(error);
      return;
    }

  }

  async function handleSubmitFB(e) {
    e.preventDefault();

    // login
    try {
      const resp = await auth.signIn({email, password, provider: "facebook"});
      console.log("respo: ", resp)
      const {redirectUrl, providerUrl, success} = resp;
      console.log("github data: ", redirectUrl, providerUrl, success, resp);
      window.location.href = providerUrl;
    } catch (error) {
      alert("error signing up");
      console.error(error);
      return;
    }

  }
  return (
    <div>
      <h1>Signup</h1>
        <button id="signupButtonGoogle" onClick={(e) => handleSubmit(e)}>Signup with Google</button>
        <button id="signupButtonFB" onClick={(e) => handleSubmitFB(e)}>Signup with Facebook</button>
    </div>
  );
}