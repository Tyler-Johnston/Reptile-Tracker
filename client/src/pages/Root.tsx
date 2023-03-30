import { Outlet, useLocation, useMatch } from "react-router-dom"

export const Root = () => {
  let name = "Home";

  return (
    <>
      <nav className="navbar">{name}</nav>
      <Outlet />
    </>
  )
}