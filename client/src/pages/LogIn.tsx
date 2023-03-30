import { useContext, useState } from "react";
import { AuthContext } from "../contexts/auth";
import { useApi } from "../hooks/useApi";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signIn() {
    const body = {
      email,
      password
    }

    const result = await fetch("http://localhost:8000/sessions", {
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(body)
    });

  }

  async function getInfo() {
    
    const result = await fetch("http://localhost:8000/users/me", {
      method: 'get',
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    });

    console.log(result)
  }

  return (
    <form className="signup-form">
      <label>
        Email
        <input value={email} onChange={e => setEmail(e.target.value)} type="email" />
      </label>
      <label>
        Password
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" />
      </label>
      <button type="button" onClick={signIn}>Sign in</button>
      <button type="button" onClick={getInfo}>get info</button>
    </form>
  )
}