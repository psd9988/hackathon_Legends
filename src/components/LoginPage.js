import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginPage = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://merd-api.merakilearn.org/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          password: password,
        }),
      });

      if (response.ok) {
        setLoginStatus('User logged in successfully');
        navigate(`/profile/${userId}`);
      } else {
        try {
          const errorData = await response.json();
          setLoginStatus('Error: ' + errorData.error);

          // Check the second API if the details don't match in the first API
          const secondApiResponse = await fetch('https://merd-api.merakilearn.org/user/gta_game/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user_id: userId,
              password: password,
            }),
          });

          if (secondApiResponse.ok) {
            setLoginStatus('User logged in successfully with the second API');
            navigate(`/profile/${userId}`);
            // Handle successful login with the second API here
          } else {
            // Handle error from the second API here
            console.error('Error logging in with the second API:', secondApiResponse.status);
            setLoginStatus('Error: ' + errorData.error + ' (Second API: ' + secondApiResponse.status + ')');
          }
        } catch (jsonError) {
          console.error('JSON error:', jsonError);
          setLoginStatus('An error occurred during login.');
        }
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setLoginStatus('An error occurred during login.');
    }
  };

  return (
    <div className="login-page">
      <header className="header">
        <h1 className="text-center text-white">Play GTA V</h1>
      </header>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h3 className="text-center">Login</h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="userId" className="form-label">User ID</label>
                    <input
                      type="text"
                      className="form-control"
                      id="userId"
                      placeholder="Enter User ID"
                      required
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
                <div className="mt-3 text-center">
                  {loginStatus.startsWith('Error') && <span className="text-danger">{loginStatus}</span>}
                  {loginStatus.startsWith('User') && <span className="text-success">{loginStatus}</span>}
                  <span>Don't have an account? <a href="/signup">Sign Up</a></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer">
        <p className="text-center text-white">© 2023 GTA V. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LoginPage;
