import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../utils/rockets";

export function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    // login
    try {
      await auth.login({email, password});
    } catch (error) {
      alert("error logging in");
      console.error(error);
      return;
    }

    // redirect back to `/`
    history.push("/");
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Login</button>
      </form>
    </div>
  );
}