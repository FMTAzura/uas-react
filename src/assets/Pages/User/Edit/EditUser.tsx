import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'flowbite-react';

interface User {
  user_id: number;
  name: string;
  email: string;
  password: string;
}

const UsersTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.put('https://alwaysme.vercel.app/users/', {
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

  const handleEdit = (user_id: number) => {
    // Tambahkan logika untuk menangani pengeditan sesuai dengan kebutuhan Anda
    console.log(`Tombol Edit diklik untuk user_id: ${user_id}`);
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <Table.Head>
          <Table.HeadCell>User ID</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Password</Table.HeadCell>
          <Table.HeadCell>Edit</Table.HeadCell> {/* Tambahkan kolom Edit */}
        </Table.Head>
        <Table.Body className="divide-y">
          {users.map((user) => (
            <Table.Row key={user.user_id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell>{user.user_id}</Table.Cell>
              <Table.Cell>{user.name}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.password}</Table.Cell>
              <Table.Cell>
                <Button onClick={() => handleEdit(user.user_id)}>Edit</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default UsersTable;
