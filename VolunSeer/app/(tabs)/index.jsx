import { useEffect, useState } from 'react';
import { getUserNames } from '../../functions/userQueries';

export default function HomeScreen() {
  const [names, setNames] = useState([]);

  useEffect(() => {
    const fetchNames = async () => {
      setNames(await getUserNames())
    }
    fetchNames();
  }, []);

  return (
    <>
      <ul>
        {names.map((name) => (
          <li>{name.name}</li>
        ))}
      </ul>
    </>
  );
}

