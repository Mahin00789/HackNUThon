import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useFormik } from 'formik';
import { Link } from 'react-router';
import * as Yup from 'yup';
import '../../CSS/auth.css';
// import adminImage from '../../assets/admin-image.jpg'; // Add this image to your assets folder

const AdminSignIn = () => {
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
        navigate('/admin/dashboard');
      }, 1000);
    }
  });

  return (
    <div className="auth-page">
      <div className="auth-image-container admin-image">
        <div className="image-overlay"></div>
        <div className="welcome-text">
          <h1>Admin Portal</h1>
          <p>Access the administrator dashboard to manage the FarmSense platform</p>
        </div>
      </div>
      <div className="auth-form-wrapper">
        <div className="auth-form-container">
          <h2>Administrator Login</h2>
          <p className="auth-subtitle">Secure access for authorized personnel only</p>
          
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="admin@farmsense.com"
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
              <Link to="/admin/forgot-password">Forgot Password?</Link>
            </div>

            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
          
          <div className="auth-separator">
            <span>or</span>
          </div>
          
          <div className="farmer-login-link">
            <Link to="/login">Go to Farmer Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSignIn;