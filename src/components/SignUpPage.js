import React, { useState } from 'react';
import './SignUpPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const SignUpPage = () => {
  const [user_id, setUser_id] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const payload = {
      first_name: formData.get('firstName'),
      last_name: formData.get('lastName'),
      gender: formData.get('gender'),
      country: formData.get('country'),
      password: formData.get('password'),
    };

    try {
      const response = await fetch('https://merd-api.merakilearn.org/user/gta_game/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        setUser_id(data.user_id);
        setErrorMessage('');
      } else {
        const errorData = await response.json();
        setErrorMessage('Error signing up: ' + errorData.error);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setErrorMessage('An error occurred during sign-up.');
    }
  };

  return (
    <div className="signup-page">
      <header className="header">
        <h1 className="text-center text-white">Play GTA V</h1>
      </header>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h3 className="text-center">Sign Up</h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input type="text" className="form-control" id="firstName" name="firstName" placeholder="Enter First Name" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input type="text" className="form-control" id="lastName" name="lastName" placeholder="Enter Last Name" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="gender" className="form-label">Gender</label>
                    <input type="text" className="form-control" id="gender" name="gender" placeholder="Enter Gender" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="country" className="form-label">Country</label>
                    <input type="text" className="form-control" id="country" name="country" placeholder="Enter Country" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" placeholder="Password" required />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">Sign Up</button>
                </form>
                {errorMessage && (
                  <div className="alert alert-danger mt-3">
                    {errorMessage}
                  </div>
                )}
                {user_id && (
                  <div className="alert alert-success mt-3">
                    Your user ID: {user_id}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer mt-5">
        <p className="text-center text-white">© 2023 GTA V. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default SignUpPage;
