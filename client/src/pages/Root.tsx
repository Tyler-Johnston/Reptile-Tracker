import {useNavigate, Outlet, useLocation, useMatch } from "react-router-dom"
import { Home } from "./Home";



export const Root = () => {
  let name = "Home";
  const navigate = useNavigate()

  return (
    <>
    
    <div style={{display:"flex"}}> 
      <button type="button" onClick={() => navigate("/login")} style={{ background: '#6c757d', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.25rem', border: 'none', marginTop: '1rem' }}>Login</button>
      <button type="button" onClick={() => navigate("/signup")} style={{ background: '#6c757d', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.25rem', border: 'none', marginTop: '1rem' }}>Sign Up</button>
      <button type="button" onClick={() => navigate("/")} style={{ background: '#6c757d', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.25rem', border: 'none', marginTop: '1rem' }}>Home</button>
    </div>
      <Outlet />
    </>
  )
}