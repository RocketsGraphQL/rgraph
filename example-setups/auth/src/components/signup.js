import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../utils/rockets";
import Cookies from 'js-cookie';


export function Signup(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    // login
    try {
      await auth.register({email, password});
      // redirect back to `/`
      // history.push("/");
    } catch (error) {
      alert("error signing up");
      console.error(error);
      return;
    }


  }

  // const locate = () => {
  //   window.location = "https://github.com/login/oauth/authorize?scope=user:email&client_id=fd135edfd2c97f8dbccb"
  // }

  const github = async () => {
    const {providerUrl, redirectUrl} = await auth.signIn({provider: "github"});
    // console.log(client);
    window.location = providerUrl;
  }

  return (
    <div>
      <h1>Signup</h1>
        <input
          id="inputUserEmail"
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          id="inputUserPassword"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button id="signupButton" onClick={handleSubmit}>Signup</button>
        <button id="signupButtonGithub" onClick={github}>Signup with Github</button>
    </div>
  );
}