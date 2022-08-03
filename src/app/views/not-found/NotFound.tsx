import * as React from 'react';
// eslint-disable-next-line node/no-extraneous-import
import { RouteComponentProps } from 'react-router';
import { Helmet } from 'react-helmet';
import { JSONLDHelmetWrapper } from '~/app/shared/components/JSONLDHelmetWrapper';
import { JsonLd } from 'react-schemaorg';
import { WebPage } from 'schema-dts';

//import * as styles from './not-found.scss'; TODO

import { Views as ViewStrings } from '~/app/AppStrings';
import { NotFoundFCProps } from './NotFound.d';

const { NotFound: viewStrings } = ViewStrings;

const {
  MainHeading: mainHeading,
  Title: title,
  Message: message,
} = viewStrings;

const pageTitle = `AppName - ${title}`;

function notFoundMetaDataComponents(): JSX.Element {
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
              headline: mainHeading,
              alternateName: pageTitle,
            }}
          />
        </JSONLDHelmetWrapper>
      </Helmet>
    </>
  );
}

function NotFound() {
  return (
    <>
      {/* Meta content */}
      {notFoundMetaDataComponents()}
      {/* Body content */}
      <main>
        <h1>{mainHeading}</h1>
        <section>
          <p>{message}</p>
        </section>
      </main>
    </>
  );
}

export { NotFound };
