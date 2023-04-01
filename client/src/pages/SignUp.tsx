import { useState } from "react";
import { useNavigate } from 'react-router-dom';


export const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function signUp() {
    const body = {
      firstName,
      lastName,
      email,
      password
    }

    const result = await fetch("http://localhost:8000/users", {
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(body)
    });

    navigate("/dashboard")

  }

  return (
    <div>
      <form className="signup-form">
        <label>
          First Name
          <input value={firstName} onChange={e => setFirstName(e.target.value)} type="text" />
        </label>
        <label>
          Last Name
          <input value={lastName} onChange={e => setLastName(e.target.value)} type="text" />
        </label>
        <label>
          Email
          <input value={email} onChange={e => setEmail(e.target.value)} type="email" />
        </label>
        <label>
          Password
          <input value={password} onChange={e => setPassword(e.target.value)} type="password" />
        </label>
        <button type="button" onClick={signUp}>Sign up</button>
      </form>

      <button type="button" onClick={() => navigate("/login")}>Login</button>

    </div>


  )
}