import { Outlet, useLocation, useMatch } from "react-router-dom"

export const Root = () => {
  let name = "Home";

  return (
    <>
      <nav>{name}</nav>
      <Outlet />
    </>
  )
}