import * as React from 'react';
// eslint-disable-next-line node/no-extraneous-import
import { RouteComponentProps, Redirect } from 'react-router';
import { Helmet } from 'react-helmet';
import { Views as ViewStrings } from '~/app/AppStrings';
import { AuthFCProps } from './Auth.d';
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

function Auth({
  location: { search: query },
  match: { params, url },
}: RouteComponentProps<AuthFCProps>) {
  const redirectPath = new URLSearchParams(query).get(REDIRECT_QUERY_KEY);

  const { isAuthError } = useAuth() as AuthContextValue;

  let view: JSX.Element;

  if (isAuthError) {
    view = <Redirect to={ERROR_ROUTE} />;
  } else if (redirectPath) {
    view = <Redirect to={redirectPath as string} />;
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
