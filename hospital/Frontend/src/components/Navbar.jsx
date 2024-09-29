import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/user/patient/logout", {
        withCredentials: true,
      });
      toast.success(res.data.message);
      setIsAuthenticated(false);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const goToLogin = () => {
    navigateTo("/login");
  };

  const goToDashboard = () => {
    window.location.href = "http://localhost:5174"; // Change to new port for dashboard
  };

  const goToPharmacy = () => {
    window.location.href = "http://localhost:3001"; // Change to new port for Pharmacy
  };

  return (
    <nav className={`navbar ${show ? 'active' : ''}`}>
      <div className="logo">
        <img src="/Logo.png" alt="logo" className="logo-img" />
      </div>
      <div className={`nav-links ${show ? "show" : ""}`}>
        <Link to="/" onClick={() => setShow(false)}>Home</Link>
        <Link to="/appointment" onClick={() => setShow(false)}>Appointment</Link>
        <Link to="/about" onClick={() => setShow(false)}>About Us</Link>
        <Link to="#" onClick={goToPharmacy}>Pharmacy</Link>
        <Link to="#" onClick={goToDashboard}>Dashboard</Link> {/* Updated this line */}
        {isAuthenticated ? (
          <button className="btn logout-btn" onClick={handleLogout}>LOGOUT</button>
        ) : (
          <button className="btn login-btn" onClick={goToLogin}>LOGIN</button>
        )}
      </div>
      <div className="hamburger" onClick={() => setShow(!show)}>
        <GiHamburgerMenu />
      </div>
    </nav>
  );
};

export default Navbar;
