import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';


export const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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

  async function signUp() {
    const body = {
      firstName,
      lastName,
      email,
      password
    }

    if (firstName === "" || lastName === "" || email === "" || password == "") {
      alert("you are missing input fields")
    }
    else {
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
  }

  return (
<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <form className="signup-form" style={{ width: '80%', maxWidth: '500px' }}>
    <label style={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
      First Name
      <input value={firstName} onChange={e => setFirstName(e.target.value)} type="text" />
    </label>
    <label style={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
      Last Name
      <input value={lastName} onChange={e => setLastName(e.target.value)} type="text" />
    </label>
    <label style={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
      Email
      <input value={email} onChange={e => setEmail(e.target.value)} type="email" />
    </label>
    <label style={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
      Password
      <input value={password} onChange={e => setPassword(e.target.value)} type="password" />
    </label>
    <button type="button" onClick={signUp} style={{ background: '#007bff', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.25rem', border: 'none' }}>Sign up</button>
  </form>

  
</div>


  )
}