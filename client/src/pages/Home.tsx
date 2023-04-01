import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
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

  return (
    <div>
      <h1>Reptile Tracker</h1>
      <h3>This is an app to allow you to...</h3>
        <ul>
            <li>Create an individual reptile</li>
            <li>create a schedule for said reptile</li>
            <li>Create a husbandry record for a reptile</li>
            <li>Record what and when you fed a reptile</li>
        </ul>

        <button type="button" onClick={() => navigate("/login")}>Login</button>
        <button type="button" onClick={() => navigate("/signup")}>Sign Up</button>
    </div>
  );
};
