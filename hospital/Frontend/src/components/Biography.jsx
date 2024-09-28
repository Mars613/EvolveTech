import React from "react";
import { FaHeartbeat, FaCalendarAlt, FaShieldAlt, FaBell, FaFileMedicalAlt } from "react-icons/fa"; // Icons

const Biography = ({ imageUrl }) => {
  return (
    <>
      <div className="container biography">
        {/* Banner Section */}
        <div className="banner">
          <div className="banner-content">
            <img src={imageUrl} alt="Know more about us" className="banner-img" />
            <h1 className="banner-title">Your Health, Our Priority</h1>
          </div>
        </div>

        {/* Biography Section */}
        <div className="biography-content">
          <div className="heading-section">
            <h3>Who We Are</h3>
            <p className="subheading">Revolutionizing Health Management for a Better Tomorrow</p>
          </div>

          <p className="intro-text">
            In today's fast-paced world, managing health appointments efficiently is crucial. We are a team of innovators dedicated to simplifying healthcare through a seamless platform where patients can book appointments, consult with doctors, and track their health, all in one place.
          </p>

          {/* Mission Section */}
          <div className="mission">
            <h4>Our Mission</h4>
            <p>
              Our goal is to empower patients with easy access to healthcare services. We aim to create an intuitive platform that ensures timely medical care and simplifies the health management process.
            </p>
          </div>

          {/* Captivating Services Section */}
          <div className="services">
            <h4>Your Journey to Better Health Starts Here</h4>
            <p className="services-intro">
              Discover how we are transforming healthcare with innovative solutions tailored just for you!
            </p>
            <div className="service-list">
              <div className="service-item card">
                <FaCalendarAlt className="service-icon" />
                <h5>Effortless Appointments</h5>
                <p>Book your doctor appointments with just a click and skip the hassle!</p>
              </div>
              <div className="service-item card">
                <FaFileMedicalAlt className="service-icon" />
                <h5>Your Health Records, Organized</h5>
                <p>Keep track of all your health consultations and records in one secure place.</p>
              </div>
              <div className="service-item card">
                <FaShieldAlt className="service-icon" />
                <h5>Safe and Secure Communication</h5>
                <p>Enjoy peace of mind with secure messaging between you and your healthcare providers.</p>
              </div>
              <div className="service-item card">
                <FaBell className="service-icon" />
                <h5>Never Miss an Appointment</h5>
                <p>Receive timely reminders and notifications for all your health check-ups.</p>
              </div>
              <div className="service-item card">
                <FaHeartbeat className="service-icon" />
                <h5>Holistic Health Integration</h5>
                <p>Integrate your health records and take charge of your well-being.</p>
              </div>
            </div>
          </div>

          {/* Closing Statement */}
          <p className="closing-text">
            With cutting-edge technology, we make health management easier. Welcome to the future of healthcare!
          </p>
        </div>
      </div>
    </>
  );
};

export default Biography;
