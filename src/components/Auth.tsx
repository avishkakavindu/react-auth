import { useEffect, useState, useMemo } from 'react';
import Cookies from 'universal-cookie';
import { redirect } from 'next/navigation';

export default function auth(Component: any) {
  return function Auth(props: any) {
    const cookies = useMemo(() => new Cookies(), []);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
      const accessToken = cookies.get('accessToken');
      setAuthenticated(!!accessToken); // set authenticated based on presence of accessToken

      if (!accessToken) {
        redirect('/');
      }
    }, [cookies]);

    if (!authenticated) {
      return null;
    }

    return <Component {...props} />;
  };
}
