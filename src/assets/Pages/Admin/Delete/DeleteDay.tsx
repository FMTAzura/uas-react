import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'flowbite-react';

interface Day {
  day_id: number;
  day: string;
}

const DaysTable: React.FC = () => {
  const [days, setDays] = useState<Day[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://alwaysme.vercel.app/days/',{
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

  const handleDeleteDay = async (dayId: number) => {
    try {
      await axios.delete(`https://alwaysme.vercel.app/days/${dayId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const updatedDays = days.filter((t_day) => t_day.day_id !== dayId);
      setDays(updatedDays);
    } catch (error) {
      console.error('Error deleting day:', error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <Table.Head>
          <Table.HeadCell>Day ID</Table.HeadCell>
          <Table.HeadCell>Day</Table.HeadCell>
          <Table.HeadCell>Aksi</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {days.map((t_day) => (
            <Table.Row key={t_day.day_id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell>{t_day.day_id}</Table.Cell>
              <Table.Cell>{t_day.day}</Table.Cell>
              <Table.Cell>
                <Button onClick={() => handleDeleteDay(t_day.day_id)} color="red">
                  Hapus
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default DaysTable;
