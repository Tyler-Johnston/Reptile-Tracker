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
        method: "get",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      setLoggedIn(result.status === 200);
    } catch (err) {
      setLoggedIn(false);
    }
  }

  async function signOut(): Promise<void> {
    await fetch("http://localhost:8000/logout", {
      method: "post",
      headers: { "Content-Type": "application/json" },
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
          <h1 className="brand" onClick={() => navigate("/")}>
            Reptile Tracker
          </h1>
          <nav className="nav-buttons">
            {loggedIn ? (
              <>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={signOut}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </button>
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
