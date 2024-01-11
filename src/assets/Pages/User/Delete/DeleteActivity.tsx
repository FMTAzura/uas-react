import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'flowbite-react';

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

  const handleDeleteActivity = async (activityId: number) => {
    try {
      await axios.delete(`https://alwaysme.vercel.app/activities/${activityId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const updatedActivities = activities.filter((activity) => activity.activity_id !== activityId);
      setActivities(updatedActivities);
    } catch (error) {
      console.error('Error deleting activity:', error);
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
          <Table.HeadCell>Aksi</Table.HeadCell>
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
              <Table.Cell>
                <Button onClick={() => handleDeleteActivity(activity.activity_id)} color="red">
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

export default ActivitiesTable;
