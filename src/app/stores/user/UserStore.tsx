import * as React from 'react';
import { UserContext as User, useUserDataFetch } from './UserContext';

function UserStore(
  props: React.PropsWithChildren<{ children: React.ReactNode }>
) {
  const { userData } = useUserDataFetch();

  return <User.Provider value={userData}>{props.children}</User.Provider>;
}

export { UserStore };
