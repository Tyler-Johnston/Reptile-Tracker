import { useState, useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import "../styles/Root.css";

export const Root: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);

  const showHeader = location.pathname !== "/";

  async function checkLoggedIn(): Promise<void> {
    try {
      const result = await fetch("http://localhost:8000/users/me", {
        credentials: "include",
      });
      setLoggedIn(result.ok);
    } catch {
      setLoggedIn(false);
    }
  }

  async function signOut(): Promise<void> {
    await fetch("http://localhost:8000/logout", {
      method: "post",
      credentials: "include",
    });
    setLoggedIn(false);
    navigate("/");
  }

  useEffect(() => {
    checkLoggedIn();
  }, [location.pathname]);

  return (
    <>
      {showHeader && (
        <header className="app-header">
          <span className="brand" onClick={() => navigate("/")}>
            <span className="brand-accent">Vinyl</span> Tracker
          </span>
          <nav className="nav-buttons">
            {loggedIn ? (
              <>
                <button className="btn-nav-ghost" onClick={() => navigate("/dashboard")}>Collection</button>
                <button className="btn-nav-ghost" onClick={() => navigate("/stats")}>Stats</button>
                <button className="btn-nav-danger" onClick={signOut}>Sign Out</button>
              </>
            ) : (
              <>
                <button className="btn-nav-outline" onClick={() => navigate("/login")}>Log In</button>
                <button className="btn-nav-filled" onClick={() => navigate("/signup")}>Sign Up</button>
              </>
            )}
          </nav>
        </header>
      )}
      <main className="app-body">
        <Outlet />
      </main>
    </>
  );
};
