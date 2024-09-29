import { useEffect, useState } from "react";
import Map from "../components/Map";
import { View } from "react-native";
import { getEvents, getUsers } from "../functions/queries";

export default function Index() {
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    }

    const fetchEvents = async () => {
      const data = await getEvents();
      setEvents(data);
    }

    fetchUsers();
    fetchEvents();
  }, [])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Map />
    </View>
  );
}
