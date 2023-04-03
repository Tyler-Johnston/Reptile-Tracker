import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';




export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function checkLoggedIn() {
    const result = await fetch("http://localhost:8000/users/me", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include"
    });

    if (result.status === 200) {
      navigate('/dashboard');
    }
  }

  useEffect(() => {
    checkLoggedIn();
  }, []);

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
    navigate("/dashboard")

  }

  return (
    <form className="signup-form" style={{ backgroundColor: '#f2f2f2', padding: '20px', borderRadius: '4px', maxWidth: '400px', margin: '0 auto' }}>
  <label style={{ display: 'block', fontSize: '20px', marginBottom: '10px' }}>
    Email
    <input value={email} onChange={e => setEmail(e.target.value)} type="email" style={{ fontSize: '16px', padding: '8px', borderRadius: '4px', border: 'none', marginBottom: '10px' }} />
  </label>
  <label style={{ display: 'block', fontSize: '20px', marginBottom: '10px' }}>
    Password
    <input value={password} onChange={e => setPassword(e.target.value)} type="password" style={{ fontSize: '16px', padding: '8px', borderRadius: '4px', border: 'none', marginBottom: '10px' }} />
  </label>
  <button type="button" onClick={signIn} style={{ fontSize: '18px', padding: '10px 20px', backgroundColor: '#008CBA', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Sign in</button>
</form>

  )
}