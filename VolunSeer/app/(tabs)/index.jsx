import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { getUserEvents } from '../../functions/queries';

export default function HomeScreen() {
  const [isLoading, setLoading] = useState(true);
  const [userId, setUserId] = useState(0);
  const [userEvents, setUserEvents] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      setUserId(1);
    }
    fetchUser();
  }, [])

  useEffect(() => {
    let isMounted = true
    const fetchUserEvents = async () => {
      if (userId) {
        setLoading(true)
        const events = await getUserEvents(userId);
        console.log("Events:", events)
        if (isMounted) {
          setUserEvents(events || []);
          setLoading(false)
        }
      }
    }
    fetchUserEvents();

    return () => {
      isMounted = false;
    }
  }, [userId]);

  if (isLoading) {
    return (
      <>
        <View>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading events...</Text>
        </View>
      </>
    )
  };

  return (
    <>
      {userEvents.length > 0 ? (
        userEvents.map(event => (
          <Text key={event.id}>{event.title}</Text>
        ))
      ) : (
        <Text>No events available</Text>
      )}
    </>
  );
}

