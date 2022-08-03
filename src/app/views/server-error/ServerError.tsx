import * as React from 'react';
// eslint-disable-next-line node/no-extraneous-import
import { RouteComponentProps } from 'react-router';
import { Helmet } from 'react-helmet';
import { JsonLd } from 'react-schemaorg';
import { WebPage } from 'schema-dts';
import { JSONLDHelmetWrapper } from '~/app/shared/components/JSONLDHelmetWrapper';

//import * as styles from './server-error.scss'; TODO

import { Views as ViewStrings } from '~/app/AppStrings';
import { ServerErrorFCProps } from './ServerError.d';
//import concatClassNames from 'classnames';

const { ServerError: viewStrings } = ViewStrings;

const {
  MainHeading: mainHeading,
  Title: title,
  Message: message,
} = viewStrings;

const pageTitle = `AppName - ${mainHeading}`;

function serverErrorMetaDataComponents(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <JSONLDHelmetWrapper>
          <JsonLd<WebPage>
            item={{
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              name: mainHeading,
              headline: pageTitle,
              alternateName: title,
            }}
          />
        </JSONLDHelmetWrapper>
      </Helmet>
    </>
  );
}

function ServerError({
  location: { search: query },
  match: { params, url },
}: RouteComponentProps<ServerErrorFCProps>) {
  return (
    <>
      {/* Meta content */}
      {serverErrorMetaDataComponents()}
      {/* Body content */}
      <main>
        <h1>{title}</h1>
        <section>
          <h2 data-testid="title">{mainHeading}</h2>
          <p>{message}</p>
        </section>
      </main>
    </>
  );
}

export { ServerError };
