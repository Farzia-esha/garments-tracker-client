import { useEffect, useState } from 'react';
import useAuth from './useAuth';

const useUserRole = () => {
  const { user, loading: authLoading } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email && !authLoading) {
      setLoading(true);
      fetch(`https://garments-tracker-system.vercel.app/users/${user.email}`)
        .then(res => {
          if (!res.ok) throw new Error('User not found');
          return res.json();
        })
        .then(data => {
          setUserData(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching user:', err);
          setUserData(null);
          setLoading(false);
        });
    } else if (!authLoading && !user) {
      setUserData(null);
      setLoading(false);
    }
  }, [user, authLoading]);

  return {
    userData,
    loading,
    userRole: userData?.role || null,
    userStatus: userData?.status || null,
    role: userData?.role || null,
    status: userData?.status || null,
    isAdmin: userData?.role === 'admin',
    isManager: userData?.role === 'manager',
    isBuyer: userData?.role === 'buyer',
    isSuspended: userData?.status === 'suspended',
    isApproved: userData?.status === 'approved',
    isPending: userData?.status === 'pending'
  };
};

export default useUserRole;