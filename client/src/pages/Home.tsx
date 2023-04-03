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
    <div style={{ backgroundColor: '#f2f2f2', padding: '20px' }}>
  <h1 style={{ fontSize: '36px', marginBottom: '20px' }}>Reptile Tracker</h1>
  <h3 style={{ fontSize: '24px', marginBottom: '20px' }}>This is an app to allow you to...</h3>
  <ul style={{ fontSize: '20px', marginBottom: '20px' }}>
    <li>Create a reptile</li>
    <li>Create a schedule for said reptile</li>
    <li>Create a husbandry record for said reptile</li>
    <li>Record what you wish to feed the reptiles</li>
  </ul>
  <button type="button" style={{ fontSize: '18px', padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', marginRight: '10px' }} onClick={() => navigate('/login')}>Login</button>
  <button type="button" style={{ fontSize: '18px', padding: '10px 20px', backgroundColor: '#008CBA', color: 'white', border: 'none', borderRadius: '4px' }} onClick={() => navigate('/signup')}>Sign Up</button>
</div>

  );
};
