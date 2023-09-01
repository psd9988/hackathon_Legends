import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './UserProfilePage.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserProfilePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`https://merd-api.merakilearn.org/user/${userId}`);
        if (response.ok) {
          const userData = await response.json();
          setUserDetails(userData[0]);
        } else {
          // If the first API request fails, try the second API
          const secondApiResponse = await fetch(`https://merd-api.merakilearn.org/user/gta_game/${userId}`);
          if (secondApiResponse.ok) {
            const secondUserData = await secondApiResponse.json();
            setUserDetails(secondUserData[0]);
          } else {
            // Handle the case when both APIs fail
            console.error('Error fetching user details:', secondApiResponse.status);
          }
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleLogout = () => {
    // Perform logout actions and navigate to the login page
    navigate('/');
  };

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-profile-page">
      <header className="header">
        <nav className="navbar navbar-dark bg-dark">
          <div className="container">
            <a className="navbar-brand" href="/">GTA V</a>
            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
          </div>
        </nav>
      </header>

      <div className="content">
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card">
                <div className="card-body">
                  <h2 className="card-title">Welcome {userDetails.first_name} {userDetails.last_name}</h2>
                  <p className="card-text">
                    Your user ID: {userDetails.user_id}<br />
                    Gender: {userDetails.gender}<br />
                    Country: {userDetails.country}
                  </p>
                  <p className="card-text">
                    Start playing GTA V now and have fun!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="container">
          <p className="text-muted">&copy; 2023 GTA V. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default UserProfilePage;
