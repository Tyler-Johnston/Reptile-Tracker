import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignIn.css";

export const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/users/me", { credentials: "include" })
      .then((r) => { if (r.ok) navigate("/dashboard"); })
      .catch(() => {});
  }, []);

  async function signIn(): Promise<void> {
    if (!email || !password) {
      alert("Please fill out both fields.");
      return;
    }
    try {
      const result = await fetch("http://localhost:8000/sessions", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      if (result.ok) {
        navigate("/dashboard");
      } else {
        alert("Invalid email or password.");
      }
    } catch {
      alert("Could not reach the server. Is the backend running?");
    }
  }

  return (
    <div className="signin-container">
      <div className="signin-card">
        <h2 className="signin-title">Welcome back</h2>
        <p className="signin-subtitle">Log in to your collection</p>

        <form className="signin-form" onSubmit={(e) => e.preventDefault()}>
          <label>
            Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            Password
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && signIn()} />
          </label>
          <button type="button" className="signin-btn" onClick={signIn}>
            Sign In
          </button>
        </form>

        <p className="signin-footer">
          Don't have an account?{" "}
          <span className="signin-link" onClick={() => navigate("/signup")}>Sign up</span>
        </p>
      </div>
    </div>
  );
};
