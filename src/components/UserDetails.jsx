import React, { useState, useEffect } from 'react';

const UserDetails = ({ selectedUser }) => {
  const [userDetails, setUserDetails] = useState(null);

  const fetchUserDetails = async () => {
    if (selectedUser) {
      try {
        const userResponse = await fetch(`https://api.github.com/users/${selectedUser}`, {
          headers: {
            Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
          },
        });
        const userData = await userResponse.json();

        const reposResponse = await fetch(userData.repos_url, {
          headers: {
            Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
          },
        });
        const reposData = await reposResponse.json();

        setUserDetails({
          avatarUrl: userData.avatar_url,
          name: userData.name,
          bio: userData.bio,
          repositories: reposData.map(repo => ({ name: repo.name, description: repo.description })),
          repositoriesNumber: reposData.length
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [selectedUser]);

  const handleClose = () => {
    setUserDetails(null);
  };

  return (
    userDetails && (
      <div>
        <div>
          <button onClick={handleClose}>&times;</button>
          <h2>{userDetails.name}</h2>
          <img src={userDetails.avatarUrl} />
          <p className>{userDetails.bio}</p>
          <p className>Number of repositories: {userDetails.repositoriesNumber}</p>
          <p className>Repositories:</p>
          <ul>
            {userDetails.repositories.map(repo => (
              <li key={repo.name}>
                <strong>{repo.name}</strong>: {repo.description}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  );
};

export default UserDetails;
