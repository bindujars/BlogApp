import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import BlogList from "./components/BlogList";
import AddPost from "./components/AddPost";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";

function App() {
  const [token, setToken] = useState(localStorage.getItem("authToken"));

  useEffect(() => {
    setToken(localStorage.getItem("authToken"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
  };

  function ConditionalNavbar() {
    const location = useLocation();
    const hideNavbarPaths = ["/login", "/register"];

    return (
      !hideNavbarPaths.includes(location.pathname) && (
        <Navbar onLogout={handleLogout} />
      )
    );
  }

  return (
    <Router>
      <ConditionalNavbar />
      <div className="container">
        <h1 className="my-4">Blog App</h1>
        <Routes>
          <Route
            path="/login"
            element={
              <Login
                onLogin={() => setToken(localStorage.getItem("authToken"))}
              />
            }
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/add-post"
            element={token ? <AddPost /> : <Navigate to="/login" />}
          />
          <Route
            path="/"
            element={token ? <BlogList /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
