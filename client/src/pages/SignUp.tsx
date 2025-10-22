import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignUp.css";

export const SignUp: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function checkLoggedIn(): Promise<void> {
    const result = await fetch("http://localhost:8000/users/me", {
      method: "get",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (result.status === 200) navigate("/dashboard");
  }

  useEffect(() => {
    checkLoggedIn();
  }, []);

  async function signUp(): Promise<void> {
    if (!firstName || !lastName || !email || !password) {
      alert("Please fill out all fields.");
      return;
    }

    const body = { firstName, lastName, email, password };
    const result = await fetch("http://localhost:8000/users", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    });

    if (result.ok) {
      navigate("/dashboard");
    } else {
      alert("Sign up failed. Please try again.");
    }
  }

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Create Your Account</h2>
        <p className="signup-subtitle">Join Reptile Tracker to start managing your reptiles</p>

        <form className="signup-form" onSubmit={(e) => e.preventDefault()}>
          <label>
            First Name
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>

          <label>
            Last Name
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>

          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button type="button" className="signup-btn" onClick={signUp}>
            Sign Up
          </button>
        </form>

        <p className="signup-footer">
          Already have an account?{" "}
          <span className="signup-link" onClick={() => navigate("/login")}>
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};
