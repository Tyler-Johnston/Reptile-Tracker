import {useNavigate, Outlet, useLocation, useMatch } from "react-router-dom"
import { Home } from "./Home";



export const Root = () => {
  let name = "Home";
  const navigate = useNavigate()

  return (
    <>
      <Outlet />
    </>
  )
}