import React from 'react';

const GithubList = ({ usersList, onUserSelect }) => {

  if (usersList) {
    return (
      <div>
        <p>Total users: {usersList.total_count}</p>
        <ul>
          {usersList.items.map((user) => (
            <button
              key={user.id}
              onClick={() => onUserSelect(user.login)}
            >
              <img
                src={user.avatar_url}
                style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }}
              />
              {user.login}
            </button>
          ))}
        </ul>
      </div>
    );
  } else {
    return <p>No users found.</p>;
  }
};

export default GithubList;
