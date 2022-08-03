import * as React from 'react';
import { AuthStoreWithRouter as Auth } from './auth/AuthStore';
import { UserStore as User } from './user/UserStore';

export type WithStoreWrappedComponent = React.JSXElementConstructor<
  Record<string, unknown>
> & {
  displayName: string;
};

export type WithStore<S> = <S>(
  Component: React.JSXElementConstructor<Record<string, unknown>>,
  Store: React.Consumer<S>,
  storePropName?: string
) => WithStoreWrappedComponent;

function Stores(props: React.PropsWithChildren<{ children: React.ReactNode }>) {
  return (
    <>
      <Auth>
        <User>{props.children}</User>
      </Auth>
    </>
  );
}

function withStore<S>(
  Component: React.JSXElementConstructor<Record<string, unknown>>,
  Store: React.Consumer<S>,
  storePropName = 'context'
): WithStoreWrappedComponent {
  const WrapperComponent = (
    props: React.PropsWithChildren<{ children: React.ReactNode }>
  ) => {
    return (
      <Store>
        {state => {
          const storeProp = {
            [storePropName]: state,
          };
          return <Component {...props} {...storeProp} />;
        }}
      </Store>
    );
  };

  WrapperComponent.displayName = `WithStore(${Component.name})`;

  return WrapperComponent as WithStoreWrappedComponent;
}

/* Usage, like Connected()
 * ```
 * const GreetingWithUserContext = withStore<Optional<UserData>>(
 *   Greeting,
 *   User.Consumer,
 *   'userData'
 * );
 * ```
 * */

export { Stores, withStore as WithStore };
