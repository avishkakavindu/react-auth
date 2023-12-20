'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import { redirect } from 'next/navigation';
import Cookies from 'universal-cookie';

import auth from '@/src/components/Auth';
import UserProfile from '@/src/components/UserProofile';

interface IUserData {
  username: string;
  email: string;
}
function Profile() {
  const [userData, setUserData] = useState<IUserData>();
  const cookies = new Cookies();
  const { push } = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = cookies.get('accessToken');
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };

        const response = await axios.get(
          'http://localhost:3002/v1/users',
          config
        );
        if (response?.data?.node) {
          setUserData(response.data.node);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

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
