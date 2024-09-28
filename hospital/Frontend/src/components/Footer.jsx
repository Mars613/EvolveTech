import React from "react";
import { Link } from "react-router-dom";
import { FaLocationArrow, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  const hours = [
    { id: 1, day: "Monday", time: "9:00 AM - 11:00 PM" },
    { id: 2, day: "Tuesday", time: "12:00 PM - 12:00 AM" },
    { id: 3, day: "Wednesday", time: "10:00 AM - 10:00 PM" },
    { id: 4, day: "Thursday", time: "9:00 AM - 9:00 PM" },
    { id: 5, day: "Friday", time: "3:00 PM - 9:00 PM" },
    { id: 6, day: "Saturday", time: "9:00 AM - 3:00 PM" },
  ];

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="logo-container">
          <img src="/Logo.jpg" alt="logo" className="logo-img" />
        </div>
        <div className="quick-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/appointment">Appointment</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>
        <div className="hours">
          <h4>Hours</h4>
          <ul>
            {hours.map((element) => (
              <li key={element.id}>
                <span>{element.day}</span>
                <span>{element.time}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="contact">
          <h4>Contact</h4>
          <div className="contact-info">
            <FaPhone />
            <span>999-999-9999</span>
          </div>
          <div className="contact-info">
            <MdEmail />
            <span>EvolveTech@gmail.com</span>
          </div>
          <div className="contact-info">
            <FaLocationArrow />
            <span>Mumbai, India</span>
          </div>
        </div>
      </div>
      <hr />
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} EvolveTech. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
