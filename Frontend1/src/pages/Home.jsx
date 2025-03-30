/** @format */

import React, { useState } from "react";
import {
  FaSeedling,
  FaCloudSunRain,
  FaMapMarkerAlt,
  FaFlask,
} from "react-icons/fa";
import "../css/home.css";

// ContactForm Component
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [responseMessage, setResponseMessage] = useState(""); // State to hold response message
  const [isError, setIsError] = useState(false); // State to track errors

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMessage(""); 
    setIsError(false);

    try {
      const response = await fetch("http://localhost:2590/api/v1/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setResponseMessage("Message submitted successfully!");
        setIsError(false);
        setFormData({ name: "", email: "", phone: "", message: "" }); 
      } else {
        setResponseMessage(data.message || "An error occurred.");
        setIsError(true);
      }
    } catch (error) {
      setResponseMessage("Server error! Please try again later.");
      setIsError(true);
    }
  };

  return (
    <section className="contact-section">
      <h2>Contact Us</h2>
      <div className="contact-container">
        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your Phone Number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                placeholder="How can we help you?"
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-button">
              Send Message
            </button>
          </form>

          {responseMessage && (
            <p className={`response-message ${isError ? "error" : "success"}`}>
              {responseMessage}
            </p>
          )}
        </div>

        <div className="contact-info">
          <h3>Get in Touch</h3>
          <p>
            Have questions about our services? Reach out to us directly and
            we'll be happy to assist you.
          </p>
          <div className="info-item">
            <strong>Email:</strong> info@farmsense.com
          </div>
          <div className="info-item">
            <strong>Phone:</strong> +1 (555) 123-4567
          </div>
          <div className="info-item">
            <strong>Address:</strong> 123 Farming Lane, Agritown, CA 94000
          </div>
        </div>
      </div>
    </section>
  );
};

// Home Component
const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Smart Farming for a Better Future</h1>
          <p>
            Soil detection, crop prediction, and weather forecasting to optimize
            your farm yield
          </p>
          <button className="cta-button">Get Started</button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Our Features</h2>
        <div className="features-container">
          <div className="feature-card">
            <div className="feature-icon">
              <FaFlask />
            </div>
            <h3>Soil Detection</h3>
            <p>
              Analyze your soil characteristics to determine its health and
              suitability for various crops.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FaSeedling />
            </div>
            <h3>Crop Prediction</h3>
            <p>
              Get recommendations for the best crops to plant based on your soil
              analysis and local conditions.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FaCloudSunRain />
            </div>
            <h3>Weather Forecasting</h3>
            <p>
              Access accurate weather predictions to plan your farming
              activities effectively.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FaMapMarkerAlt />
            </div>
            <h3>Land Tracking</h3>
            <p>
              Monitor and track conditions across your farmland to optimize
              resource management.
            </p>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-section">
        <div className="about-content">
          <h2>About FarmSense</h2>
          <p>
            FarmSense is a comprehensive platform designed to help farmers make
            data-driven decisions. Our advanced technology analyzes soil
            conditions, predicts suitable crops, and provides accurate weather
            forecasts to optimize your farming operations.
          </p>
          <p>
            We combine cutting-edge AI with agricultural expertise to deliver
            reliable recommendations that increase yield, reduce costs, and
            promote sustainable farming practices.
          </p>
        </div>
        <div className="about-image"></div>
      </section>

      {/* Contact Form Component */}
      <ContactForm />
    </div>
  );
};

export default Home;
