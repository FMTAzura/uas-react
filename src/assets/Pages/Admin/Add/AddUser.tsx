import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TextInput, Button } from 'flowbite-react';

interface User {
  user_id: number;
  name: string;
  email: string;
  password: string;
}

const UsersTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<User>({
    user_id: 0,
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://alwaysme.vercel.app/users/', {
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

  const handleAddUser = async () => {
    try {
      const response = await axios.post(
        'https://alwaysme.vercel.app/users/',
        {
          name: newUser.name,
          email: newUser.email,
          password: newUser.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      setUsers([...users, response.data]); // Menambahkan pengguna baru ke daftar pengguna
      setNewUser({
        user_id: 0,
        name: '',
        email: '',
        password: '',
      }); // Mengosongkan input setelah berhasil menambahkan pengguna baru
    } catch (error) {
      console.error('Error adding new user:', error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <Table.Head>
          <Table.HeadCell>User ID</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Password</Table.HeadCell>
          <Table.HeadCell>
            <div className="flex items-center">
              Tambahkan Pengguna Baru
              <TextInput
                className="ml-2"
                type="text"
                placeholder="Nama"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              />
              <TextInput
                className="ml-2"
                type="text"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
              <TextInput
                className="ml-2"
                type="password"
                placeholder="Password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              />
              <Button onClick={handleAddUser}>Tambah</Button>
            </div>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {users.map((user) => (
            <Table.Row key={user.user_id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell>{user.user_id}</Table.Cell>
              <Table.Cell>{user.name}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.password}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default UsersTable;
