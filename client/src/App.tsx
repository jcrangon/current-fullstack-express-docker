import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import Register from "./pages/Register";
import ProtectedRoute from "./auth/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import DemoReact from "./pages/DemoReact";
import Login from "./pages/Login";



export default function App() {
  
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/demo" element={<DemoReact />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />} >
          <Route path="/posts" element={<Dashboard />} />
        </Route>
      </Routes>
  );
}
