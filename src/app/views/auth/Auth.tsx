import * as React from 'react';
// eslint-disable-next-line node/no-extraneous-import
import {Navigate,} from 'react-router';
import {useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Views as ViewStrings } from '~/app/AppStrings';
import { ERROR_ROUTE } from '~/app/AppRoutes';
import { AuthContextValue } from '~/app/stores/auth/AuthContext.d';
import { useAuth } from '~/app/stores/auth/AuthContext';

//Temp
const REDIRECT_QUERY_KEY = 'TEMP_REDIRECT_QUERY_KEY';

const { Auth: authViewStrings } = ViewStrings;

const { MainHeading: mainHeading } = authViewStrings;

const pageTitle = `AppName - ${mainHeading}`;

function authMetaDataComponents(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
    </>
  );
}

function Auth() {
  const query = useSearchParams()[0]
  const redirectPath = query.get(REDIRECT_QUERY_KEY);

  const { isAuthError } = useAuth() as AuthContextValue;

  let view: JSX.Element;

  if (isAuthError) {
    view = <Navigate to={ERROR_ROUTE} replace />;
  } else if (redirectPath) {
    view = <Navigate to={redirectPath as string} replace />;
  } else {
    view = (
      <>
        {/* Meta content */}
        {authMetaDataComponents()}
        {/* Body content */}
        <main></main>
      </>
    );
  }

  return view;
}

export { Auth };
