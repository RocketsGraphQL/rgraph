import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { auth } from "../utils/config";


export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    // login
    try {
      await auth.signIn({email, password, provider: "local"});
    } catch (error) {
      alert("error logging in");
      console.error(error);
      return;
    }

    navigate("/");
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