import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/Home";
import { Root } from "./pages/Root";
import { Dashboard } from "./pages/Dashboard";
import { SignUp } from "./pages/SignUp";
import { SignIn } from "./pages/SignIn";
import { RecordPage } from "./pages/Record";
import { StatsPage } from "./pages/Stats";
import { SettingsPage } from "./pages/Settings";
import { ProfilePage } from "./pages/Profile";
import { Error } from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Home /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "signup", element: <SignUp /> },
      { path: "login", element: <SignIn /> },
      { path: "record/:id", element: <RecordPage /> },
      { path: "stats", element: <StatsPage /> },
      { path: "settings", element: <SettingsPage /> },
      { path: "u/:username", element: <ProfilePage /> },
      { path: "*", element: <Error /> },
    ],
  },
]);

export const App = () => <RouterProvider router={router} />;
