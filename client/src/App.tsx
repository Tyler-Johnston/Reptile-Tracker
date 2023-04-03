import { useEffect, useState } from "react"
import { createBrowserRouter, RouterProvider, useLocation } from "react-router-dom"
import { ApiContext } from "./contexts/api"
import { Api } from "./lib/api"
import { Home } from "./pages/Home"
import { Root } from "./pages/Root"
import { Dashboard } from "./pages/Dashboard"
import { SignUp } from "./pages/SignUp"
import { SignIn } from "./pages/SignIn"
import { Reptile } from "./pages/Reptile"
import { Error } from "./pages/Error"


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
        element: <SignIn />,
      },
      {
        path: 'reptile/:id',
        element: <Reptile />,
      }
      ,
      {
        path: '*',
        element: <Error />
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
