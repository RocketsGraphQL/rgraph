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
      const {providerUrl, redirectUrl, success} = await auth.signIn({email, password, provider: "github"});
      console.log("github data: ", providerUrl, redirectUrl, success);
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
        <button id="signupButton" onClick={(e) => handleSubmit(e)}>Signup with Github</button>
    </div>
  );
}