import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('admin@gymflow.com');
  const [password, setPassword] = useState('password');

  return (
    <div className="login-page">
      <div className="login-card">

        {/* Icon */}
        <div className="login-icon-wrapper">
          <div className="login-icon">
            <svg width="24" height="24" fill="none" stroke="white" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <div className="login-header">
          <h1>Welcome to GymFlow</h1>
          <p>Enter your credentials to access the dashboard</p>
        </div>

        {/* Form */}
        <div className="login-form">
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button className="login-btn">Sign In</button>
        </div>

        {/* Test Accounts */}
        <div className="login-footer">
          <p className="footer-title">Test Accounts</p>
          <p>Admin: <span>admin@gymflow.com</span> / password</p>
          <p>Cashier: <span>cashier@gymflow.com</span> / password</p>
        </div>

      </div>
    </div>
  );
};

export default Login;