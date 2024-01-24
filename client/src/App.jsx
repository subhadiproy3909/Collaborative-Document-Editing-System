import { Routes, Route } from "react-router-dom";


import Home from "./pages/Home"
import "./assets/css/style.css";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import Editor from "./pages/Editor";
import Protected from "./components/Protected";
import { useEffect } from "react";

import { EditorState } from "./context/ContextProvider";
import { checkAuthApi } from "./Api/userApi";

function App() {
  const { user, setUser } = EditorState();

  const checkAuth = async function () {
    const data = await checkAuthApi();
    setUser(data);
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} ></Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={ <Protected> <Home /> </Protected> } />
        <Route path="/:id" element={ <Editor /> } />

        <Route path="/*" element={"Page not found"} />
      </Routes>
    </>
  )
}

export default App
