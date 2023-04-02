import {useNavigate, Outlet, useLocation, useMatch } from "react-router-dom"
import { Home } from "./Home";



export const Root = () => {
  let name = "Home";
  const navigate = useNavigate()

  return (
    <>
    
    <div style={{display:"flex", justifyContent:'space-between',background:"#f0f0f0"}}> 
      <h1>Repto-Trac</h1>
    <span style={{display:"flex", justifyContent:"right", background:"#f0f0f0"}}> 
      <button type="button" onClick={() => navigate("/login")} style={{ background: '#4CAF50', color: 'white', margin:'16px 4px', padding: '0.5rem 1rem', borderRadius: '0.25rem', border: 'none', marginTop: '1rem' }}>Login</button>
      <button type="button" onClick={() => navigate("/signup")} style={{ background: '#008CBA', color: 'white', margin:'16px 4px', padding: '0.5rem 1rem', borderRadius: '0.25rem', border: 'none', marginTop: '1rem' }}>Sign Up</button>
      <button type="button" onClick={() => navigate("/")} style={{ background: '#6c757d', color: 'white', margin:'16px 4px', padding: '0.5rem 1rem', borderRadius: '0.25rem', border: 'none', marginTop: '1rem' }}>Home</button>
    </span>
    </div>
    <br></br>
      <Outlet />
    </>
  )
}