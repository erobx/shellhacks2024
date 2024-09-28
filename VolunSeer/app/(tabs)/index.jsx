import { useEffect, useState } from 'react';
import { getUserNames, getUserRoles } from '../../functions/userQueries';

export default function HomeScreen() {
  const [names, setNames] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchNames = async () => {
      setNames(await getUserNames())
    }
    const fetchRoles = async (userId) => {
      console.log("hmmm")
      setRoles(await getUserRoles(userId))
    }
    //fetchNames();
    fetchRoles(1);
  }, []);

  return (
    <>
      <ul>
        {roles.map((r) => (
          <li>{r.name}</li>
        ))}
      </ul>
    </>
  );
}

