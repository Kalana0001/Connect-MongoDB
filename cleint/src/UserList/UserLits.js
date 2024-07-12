import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserList.css'; // Import your external CSS file

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:2783/mongo-getUsers')
      .then(response => {
        console.log('Users received from backend:', response.data);
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);  // Empty dependency array ensures useEffect runs once on component mount

  return (
    <div className="user-list-container">
      <h2>User Reviews</h2>
      <a href='/user' className="add-user-link">Add User</a>
      <ul className="user-list">
        {users.map(user => (
          <li key={user._id} className="user-item">
            {user.name} - {user.disc}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
