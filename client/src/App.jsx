import { Routes, Route, createBrowserRouter, RouterProvider } from "react-router-dom";


import Home from "./pages/Home"
import "./assets/css/style.css";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import Editor from "./pages/Editor";
import Protected from "./components/Protected";
import { useEffect, useState } from "react";

import { EditorState } from "./context/ContextProvider";
import { checkAuthApi } from "./Api/userApi";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/",
    element:
      <Protected>
        <Home />
      </Protected>,
    errorElement: "Page not found",
  },
  {
    path: "/:id",
    element:
      <Protected>
        <Editor />
      </Protected>
  }
])

function App() {
  const { user, setUser } = EditorState();
  const [checkUser,  setCheckUser] = useState(false);

  const checkAuth = function () {
    const checkLoginTime = localStorage.getItem("loginTime");
    if(checkLoginTime === null) return;
    const currentTime = new Date(Date.now()).getTime();
    if((currentTime - checkLoginTime) > 1000 * 60 * 10){
      localStorage.clear();
      return;
    }
    const userData = JSON.parse(localStorage.getItem("userdata"));
    setUser({ username: userData.username, email: userData.email });
  }
  
  useEffect(() => {
    checkAuth();
    setCheckUser(true);
    // console.log(data);

  }, []);

  console.log(checkUser);
  return (
    <>
      {
        checkUser &&
        <RouterProvider router={router} />
      }
    </>
  )
}

export default App
