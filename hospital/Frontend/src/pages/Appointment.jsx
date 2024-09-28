import React from "react";
import Hero from "../components/Hero";
import AppointmentForm from "../components/AppointmentForm";

const Appointment = () => {
  return (
    <>
      <Hero
        title={"Schedule Your Appointment | EvolveTech Medical Institute"}
        imageUrl={"/signin.png"}
      />
      <div className="appointment-container">
        <h2 className="appointment-title">Book Your Appointment</h2>
        <p className="appointment-description">
          Fill out the form below to schedule your appointment with our medical professionals. We look forward to assisting you!
        </p>
        <AppointmentForm />
      </div>
    </>
  );
};

export default Appointment;
