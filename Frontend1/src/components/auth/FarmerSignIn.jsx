import React, { useState } from "react";
import { Link, useNavigate } from "react-router"; // Fixed import
import { useFormik } from "formik";
import * as Yup from "yup";
import "../../CSS/auth.css";

const FarmerSignIn = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      setError(null);
      setSuccess(false);

      try {
        const response = await fetch(
          "http://localhost:7000/api/v1/users/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );

        const data = await response.json();
        
        if (!response.ok || !data.success) {
          throw new Error(data.message || "Login failed");
        }

        // Store authentication data
        if (data.data && data.data.accessToken) {
          localStorage.setItem('accessToken', data.data.accessToken);
          localStorage.setItem('refreshToken', data.data.refreshToken);
          
          // Store user data (without sensitive info)
          if (data.data.user) {
            localStorage.setItem('userData', JSON.stringify(data.data.user));
          }
        }

        console.log("Login Successful");
        setSuccess(true);

        // Wait for 1.5 seconds before navigating
        setTimeout(() => {
          navigate("/farmer/dashboard");
        }, 1500);
      } catch (error) {
        setError(error.message);
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
          <h1>Welcome Back</h1>
          <p>Access your FarmSense account to manage your farm efficiently</p>
        </div>
      </div>
      <div className="auth-form-wrapper">
        <div className="auth-form-container">
          <h2>Farmer Login</h2>
          <p className="auth-subtitle">Enter your credentials to continue</p>

          {error && <div className="error-message">{error}</div>}
          {success && (
            <div className="success-message">
              Login Successful! Redirecting...
            </div>
          )}

          <form onSubmit={formik.handleSubmit}>
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
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="error">{formik.errors.email}</div>
              ) : null}
            </div>

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
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="error">{formik.errors.password}</div>
              ) : null}
            </div>

            <div className="forgot-password">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>

            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="auth-redirect">
            Don't have an account?{" "}
            <Link to="/farmer/signup">Create Account</Link>
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

export default FarmerSignIn;