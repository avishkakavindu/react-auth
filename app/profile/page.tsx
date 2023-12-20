'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'universal-cookie';

import { getUserData } from '@/src/services/user.service';
import auth from '@/src/components/Auth';
import UserProfile from '@/src/components/UserProfile';

interface IUserData {
  username: string;
  email: string;
}

function Profile() {
  const [userData, setUserData] = useState<IUserData>();
  const cookies = new Cookies();
  const { push } = useRouter();

  // fetch authenticated user data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = cookies.get('accessToken');
        const userNode = await getUserData(accessToken);
        setUserData(userNode);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  /**
   * Handle login out  user
   */
  const handleLogout = () => {
    // remove authentication tokens from cookies
    cookies.remove('accessToken');
    cookies.remove('refreshToken');

    // redirect to the login page
    push('/');
  };

  return (
    <div>
      <UserProfile
        email={userData?.email || ''}
        username={userData?.username || ''}
        handleLogout={handleLogout}
      />
    </div>
  );
}

export default auth(Profile);
