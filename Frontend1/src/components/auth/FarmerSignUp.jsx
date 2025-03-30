/** @format */

import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../../CSS/auth.css";

const FarmerSignUp = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const validationSchema = Yup.object({
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    village: Yup.string().required("Village name is required"),
    pincode: Yup.string()
      .matches(/^[0-9]{6}$/, "Pincode must be 6 digits")
      .required("Pincode is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      village: "",
      pincode: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      setError(null);
      setSuccess(null);

      try {
        await validationSchema.validate(values, { abortEarly: false });

        // Destructure to remove confirmPassword and keep other field names unchanged
        const { confirmPassword, ...payload } = {
          ...values,
          role: "farmer",
        };

        console.log("Submitting payload:", payload);

        const response = await fetch(
          "http://localhost:2780/api/v1/users/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || `Registration failed with status ${response.status}`
          );
        }

        console.log("Registration response:", data);
        setSuccess("Registration successful! Redirecting to login...");
      } catch (err) {
        console.error("Registration error:", err);
        if (err.name === "ValidationError") {
          const errors = {};
          err.inner.forEach((error) => {
            errors[error.path] = error.message;
          });
          formik.setErrors(errors);
        } else {
          setError(err.message || "Something went wrong. Please try again.");
        }
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="auth-page">
      <div className="auth-image-container">
        <div className="image-overlay"></div>
        <div className="welcome-text">
          <h1>Join FarmSense</h1>
          <p>
            Create your account to start managing your farm efficiently with our
            smart agriculture solutions
          </p>
        </div>
      </div>
      <div className="auth-form-wrapper">
        <div className="auth-form-container">
          <h2>Farmer Registration</h2>
          <p className="auth-subtitle">Fill in your details to get started</p>

          {success && <div className="success-message">{success}</div>}
          {error && <div className="error-message">{error}</div>}

          <form onSubmit={formik.handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstname">First Name</label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  placeholder="John"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstname}
                  className={
                    formik.touched.firstname && formik.errors.firstname
                      ? "error-border"
                      : ""
                  }
                />
                {formik.touched.firstname && formik.errors.firstname && (
                  <div className="error">{formik.errors.firstname}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="lastname">Last Name</label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  placeholder="Doe"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastname}
                  className={
                    formik.touched.lastname && formik.errors.lastname
                      ? "error-border"
                      : ""
                  }
                />
                {formik.touched.lastname && formik.errors.lastname && (
                  <div className="error">{formik.errors.lastname}</div>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="john.doe@example.com"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className={
                    formik.touched.email && formik.errors.email
                      ? "error-border"
                      : ""
                  }
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="error">{formik.errors.email}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="1234567890"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                  className={
                    formik.touched.phone && formik.errors.phone
                      ? "error-border"
                      : ""
                  }
                />
                {formik.touched.phone && formik.errors.phone && (
                  <div className="error">{formik.errors.phone}</div>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="village">Village Name</label>
                <input
                  type="text"
                  id="village"
                  name="village"
                  placeholder="Enter your village name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.village}
                  className={
                    formik.touched.village && formik.errors.village
                      ? "error-border"
                      : ""
                  }
                />
                {formik.touched.village && formik.errors.village && (
                  <div className="error">{formik.errors.village}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="pincode">Pincode</label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  placeholder="123456"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.pincode}
                  className={
                    formik.touched.pincode && formik.errors.pincode
                      ? "error-border"
                      : ""
                  }
                />
                {formik.touched.pincode && formik.errors.pincode && (
                  <div className="error">{formik.errors.pincode}</div>
                )}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className={
                    formik.touched.password && formik.errors.password
                      ? "error-border"
                      : ""
                  }
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="error">{formik.errors.password}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="••••••••"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                  className={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                      ? "error-border"
                      : ""
                  }
                />
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <div className="error">{formik.errors.confirmPassword}</div>
                  )}
              </div>
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={isLoading || !formik.isValid}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="auth-redirect">
            Already have an account? <Link to="/farmer/login">Sign In</Link>
          </div>

          <div className="auth-separator">
            <span>or</span>
          </div>

          <div className="admin-login-link">
            <Link to="/admin/login">Login as Administrator</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerSignUp;
