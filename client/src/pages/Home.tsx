import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

export const Home: React.FC = () => {
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

  return (
    <div className="home-container">
      <div className="home-content text-center">
        <h1 className="home-title">Reptile Tracker</h1>
        <h3 className="home-subtitle">
          Track and care for your reptiles with ease
        </h3>
        <p className="home-description">
          Keep tabs on feedings, health logs, and husbandry records — all in one
          clean dashboard.
        </p>

        <div className="home-buttons">
          <button
            type="button"
            className="btn btn-success btn-lg me-3"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            type="button"
            className="btn btn-success btn-lg"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </div>

        <ul className="home-features mt-5">
          <li>🐍 Add and manage your reptiles</li>
          <li>📅 Create feeding and care schedules</li>
          <li>🩺 Record health and environment data</li>
          <li>🍽 Track feeding habits and progress</li>
        </ul>
      </div>
    </div>
  );
};
