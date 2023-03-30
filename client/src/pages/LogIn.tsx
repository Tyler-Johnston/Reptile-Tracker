import { useContext, useState } from "react";
import { AuthContext } from "../contexts/auth";
import { useApi } from "../hooks/useApi";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const api = useApi();
  const setToken = useContext(AuthContext);

  async function signIn() {
    console.log("it clicked button in login");
    const body = {
      email,
      password
    }
    // const resultBody = await api.post(`${import.meta.env.DATABASE_URL}/users`, body)
    const resultBody = await api.post("http://localhost:8000/sessions", body)

  }

  async function getInfo() {
    const me = await api.get("http://localhost:8000/users/me")
    console.log(me);

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