import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TextInput, Button } from 'flowbite-react';

interface Day {
  day_id: number;
  day: string;
}

const DaysTable: React.FC = () => {
  const [days, setDays] = useState<Day[]>([]);
  const [newDay, setNewDay] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://alwaysme.vercel.app/days/', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setDays(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddDay = async () => {
    try {
      const response = await axios.post(
        'https://alwaysme.vercel.app/days/',
        {
          day: newDay,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      setDays([...days, response.data]); // Menambahkan hari baru ke daftar hari
      setNewDay(''); // Mengosongkan input setelah berhasil menambahkan hari baru
    } catch (error) {
      console.error('Error adding new day:', error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <Table.Head>
          <Table.HeadCell>Day ID</Table.HeadCell>
          <Table.HeadCell>Day</Table.HeadCell>
          <Table.HeadCell>
            <div className="flex items-center">
              Tambahkan Hari Baru
              <TextInput
                className="ml-2"
                type="text"
                value={newDay}
                onChange={(e) => setNewDay(e.target.value)}
              />
              <Button onClick={handleAddDay}>Tambah</Button>
            </div>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {days.map((t_day) => (
            <Table.Row key={t_day.day_id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell>{t_day.day_id}</Table.Cell>
              <Table.Cell>{t_day.day}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default DaysTable;
