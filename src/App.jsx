import React, { useState } from 'react';
import Title from './components/Title';
import SearchInput from './components/SearchInput';
import GithubList from './components/GithubList';
import Button from './components/Button';
import UserDetails from './components/UserDetails';

function App() {
  const [searchItem, setSearchItem] = useState('');
  const [usersList, setUsersList] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const inputChange = (event) => {
    setSearchItem(event.target.value);
  };

  const buttonClick = async () => {
    const response = await fetch(`https://api.github.com/search/users?q=${searchItem}`, {
      headers: {
        Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });
    const data = await response.json();
    setUsersList(data);
  };

  const handleUserSelect = (username) => {
    setSelectedUser(username);
  }

  return (
    <>
      <Title>Github Inspector</Title>
      <SearchInput onChange={inputChange} />
      <Button onClick={buttonClick} />
      <GithubList usersList={usersList} onUserSelect={handleUserSelect} />
      <UserDetails selectedUser={selectedUser} />
    </>
  );
}

export default App;
