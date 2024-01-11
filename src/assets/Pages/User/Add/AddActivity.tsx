import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TextInput, Button, Checkbox } from 'flowbite-react'; 

interface Activity {
  activity_id: number;
  user_id: number;
  title: string;
  description: string;
  day_id: number;
  date: Date;
  done: boolean;
}

const ActivitiesTable: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [newActivity, setNewActivity] = useState<Activity>({
    activity_id: 0,
    user_id: 0,
    title: '',
    description: '',
    day_id: 0,
    date: new Date(),
    done: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://alwaysme.vercel.app/activities/', {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const activitiesData: Activity[] = response.data.map((activity: any) => ({
          ...activity,
          date: new Date(activity.date), // Konversi string ke objek Date
          done: activity.done === 'true', // Konversi string 'true'/'false' ke boolean
        }));

        setActivities(activitiesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddActivity = async () => {
    try {
      const response = await axios.post(
        'https://alwaysme.vercel.app/activities/',
        {
          user_id: newActivity.user_id,
          title: newActivity.title,
          description: newActivity.description,
          day_id: newActivity.day_id,
          date: newActivity.date,
          done: newActivity.done,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      setActivities([...activities, response.data]); // Menambahkan kegiatan baru ke daftar kegiatan
      setNewActivity({
        activity_id: 0,
        user_id: 0,
        title: '',
        description: '',
        day_id: 0,
        date: new Date(),
        done: false,
      }); // Mengosongkan input setelah berhasil menambahkan kegiatan baru
    } catch (error) {
      console.error('Error adding new activity:', error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <Table.Head>
          <Table.HeadCell>Activity ID</Table.HeadCell>
          <Table.HeadCell>User Id</Table.HeadCell>
          <Table.HeadCell>Title</Table.HeadCell>
          <Table.HeadCell>Description</Table.HeadCell>
          <Table.HeadCell>Day Id</Table.HeadCell>
          <Table.HeadCell>Date</Table.HeadCell>
          <Table.HeadCell>Done</Table.HeadCell>
          <Table.HeadCell>
            <div className="flex items-center">
              Tambahkan Kegiatan Baru
              <TextInput
                className="ml-2"
                type="text"
                placeholder="Judul"
                value={newActivity.title}
                onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
              />
              <TextInput
                className="ml-2"
                type="text"
                placeholder="Deskripsi"
                value={newActivity.description}
                onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
              />
              <TextInput
                className="ml-2"
                type="number"
                placeholder="ID Hari"
                value={newActivity.day_id}
                onChange={(e) => setNewActivity({ ...newActivity, day_id: Number(e.target.value) })}
              />
              <TextInput
                className="ml-2"
                type="datetime-local"
                value={newActivity.date.toISOString().substring(0, 16)}
                onChange={(e) => setNewActivity({ ...newActivity, date: new Date(e.target.value) })}
              />
              <Checkbox
                className="ml-2"
                id="done"
                checked={newActivity.done}
                onChange={() => setNewActivity({ ...newActivity, done: !newActivity.done })}
              />
              <Button onClick={handleAddActivity}>Tambah</Button>
            </div>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {activities.map((activity) => (
            <Table.Row key={activity.activity_id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell>{activity.activity_id}</Table.Cell>
              <Table.Cell>{activity.user_id}</Table.Cell>
              <Table.Cell>{activity.title}</Table.Cell>
              <Table.Cell>{activity.description}</Table.Cell>
              <Table.Cell>{activity.day_id}</Table.Cell>
              <Table.Cell>{activity.date.toLocaleString('id-ID')}</Table.Cell>
              <Table.Cell>{activity.done ? 'Selesai' : 'Belum Selesai'}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default ActivitiesTable;
