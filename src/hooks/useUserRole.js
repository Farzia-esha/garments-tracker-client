import { useEffect, useState } from 'react';
import useAuth from './useAuth';

const useUserRole = () => {
  const { user } = useAuth();
  const [userRole, setUserRole] = useState(null);
  const [userStatus, setUserStatus] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      fetch(`http://localhost:3000/users/${user.email}`)
        .then(res => {
          if (!res.ok) {
            throw new Error('User not found');
          }
          return res.text();
        })
        .then(text => {
          if (!text) {
            console.log('User not found in database');
            setUserRole(null);
            setUserStatus(null);
            setUserData(null);
            setLoading(false);
            return;
          }
          const data = JSON.parse(text);
          setUserRole(data?.role);
          setUserStatus(data?.status);
          setUserData(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching user role:', err);
          setUserRole(null);
          setUserStatus(null);
          setUserData(null);
          setLoading(false);
        });
    } else {
      setUserRole(null);
      setUserStatus(null);
      setUserData(null);
      setLoading(false);
    }
  }, [user]);

  return { userRole, userStatus, userData, loading };
};

export default useUserRole;

