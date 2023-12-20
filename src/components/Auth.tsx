import { redirect } from 'next/navigation';

import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';

export default function auth(Component: any) {
  return function Auth(props: any) {
    const cookies = new Cookies();
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
      const accessToken = cookies.get('accessToken');
      setAuthenticated(!!accessToken); // Set authenticated based on presence of accessToken

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
