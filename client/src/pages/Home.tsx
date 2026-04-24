import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

export const Home: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/users/me", { credentials: "include" })
      .then((r) => { if (r.ok) navigate("/dashboard"); })
      .catch(() => {});
  }, []);

  return (
    <div className="home-container">
      <div className="home-hero">
        <div className="home-hero-text">
          <h1 className="home-title">Your vinyl collection,<br />organized.</h1>
          <p className="home-description">
            Search Discogs, grade every record on the Goldmine standard, and track every play — all in one place.
          </p>
          <div className="home-buttons">
            <button className="btn-hero-primary" onClick={() => navigate("/login")}>
              Log In
            </button>
            <button className="btn-hero-secondary" onClick={() => navigate("/signup")}>
              Create Account
            </button>
          </div>
        </div>
      </div>

      <div className="home-features">
        <div className="feature-card">
          <div className="feature-icon">🔍</div>
          <h3>Discogs Search</h3>
          <p>Find any release instantly. Auto-fill artist, label, year, and cover art from the world's largest music database.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🎯</div>
          <h3>Goldmine Grading</h3>
          <p>Track media and sleeve condition from Mint down to Poor using the industry-standard Goldmine scale.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">▶</div>
          <h3>Play History</h3>
          <p>Log every spin. Know exactly how many times you've dropped the needle on each record.</p>
        </div>
      </div>
    </div>
  );
};
