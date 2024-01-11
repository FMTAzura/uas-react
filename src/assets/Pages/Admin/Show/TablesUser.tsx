import React, { useState, useEffect } from 'react';
import { Table } from 'flowbite-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface User {
  user_id: number;
  name: string;
  email: string;
  password: string;
}

const UsersTable: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://alwaysme.vercel.app/users/',{
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (userId: number) => {
    // Implementasi logika edit sesuai kebutuhan
    console.log(`Edit user with ID: ${userId}`);
    navigate(`edit/${userId}`);
  };

  const handleDelete = ((userId)=>{
    if(window.confirm('Are you sure you want to delete this user?')) {
      axios.delete(`https://alwaysme.vercel.app/users/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.user_id !== userId));
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
    }
  })

  return (
    <div className="overflow-x-auto">
      <Table>
        <Table.Head>
        <Table.HeadCell>User ID</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Password</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {users.map((user) => (
            <Table.Row key={user.user_id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell>{user.user_id}</Table.Cell>
              <Table.Cell>{user.name}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.password}</Table.Cell>
              <Table.Cell>
                <button onClick={() => handleEdit(user.user_id)}>Edit</button>
                <button onClick={() => handleDelete(user.user_id)}>Delete</button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default UsersTable;
