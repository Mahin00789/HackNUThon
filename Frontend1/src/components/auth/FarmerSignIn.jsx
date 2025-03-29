import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router';
import '../../CSS/auth.css';
// import farmImage from '../../assets/farm-image.jpg'; // Add this image to your assets folder

const FarmerSignIn = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        console.log('Form submitted:', values);
        setIsLoading(false);
        navigate('/farmer/dashboard');
      }, 1000);
    }
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
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
          
          <div className="auth-redirect">
            Don't have an account? <Link to="/farmer/signup">Create Account</Link>
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