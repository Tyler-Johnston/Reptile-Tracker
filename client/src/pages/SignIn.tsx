import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignIn.css";

export const SignIn: React.FC = () => {
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

  async function signIn(): Promise<void> {
    if (!email || !password) {
      alert("Please fill out both fields.");
      return;
    }

    const body = { email, password };
    const result = await fetch("http://localhost:8000/sessions", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    });

    if (result.status === 200) {
      navigate("/dashboard");
    } else {
      alert("Invalid email or password.");
    }
  }

  return (
    <div className="signin-container">
      <div className="signin-card">
        <h2 className="signin-title">Welcome Back</h2>
        <p className="signin-subtitle">Log in to manage your reptiles</p>

        <form className="signin-form" onSubmit={(e) => e.preventDefault()}>
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

          <button type="button" className="signin-btn" onClick={signIn}>
            Sign In
          </button>
        </form>

        <p className="signin-footer">
          Don’t have an account?{" "}
          <span className="signin-link" onClick={() => navigate("/signup")}>
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};
