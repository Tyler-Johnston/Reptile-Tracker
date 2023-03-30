import { useEffect, useState } from "react"
import { createBrowserRouter, RouterProvider, useLocation } from "react-router-dom"
import { ApiContext } from "./contexts/api"
import { Api } from "./lib/api"
import { Home } from "./pages/Home"
import { Root } from "./pages/Root"
import { Dashboard } from "./pages/Dashboard"
import { SignUp } from "./pages/SignUp"
import { Login } from "./pages/Login"
import { Reptile } from "./pages/Reptile"


const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'reptile',
        element: <Reptile />,
      }

    ]
  },
])

export const App = () => {

  const [api, setApi] = useState(new Api());

  // useEffect(() => {
  //   setApi(new Api());
  // }, []);


  return (
    <>
      <ApiContext.Provider value={api}>
        <RouterProvider router={router} />
      </ApiContext.Provider>
    </>
  )
}