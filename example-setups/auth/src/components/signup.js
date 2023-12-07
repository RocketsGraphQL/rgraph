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
      await auth.register({email, password});
    } catch (error) {
      alert("error signing up");
      console.error(error);
      return;
    }

  }

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
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
        <button id="signupButton">Signup</button>
      </form>
    </div>
  );
}