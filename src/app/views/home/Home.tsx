import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Helmet } from 'react-helmet';
import { JsonLd } from 'react-schemaorg';
import { WebPage } from 'schema-dts';
import { JSONLDHelmetWrapper } from '~/app/shared/components/JSONLDHelmetWrapper';

import { Views as ViewStrings } from '~/app/AppStrings';
import { ServerErrorFCProps } from './Home';

const { Home: viewStrings } = ViewStrings;

const { MainHeading: mainHeading, Title: title } = viewStrings;

const pageTitle = `AppName - ${mainHeading}`;

function homeMetaDataComponents(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <JSONLDHelmetWrapper>
          <JsonLd<WebPage>
            item={{
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              headline: pageTitle,
              alternateName: title,
            }}
          />
        </JSONLDHelmetWrapper>
      </Helmet>
    </>
  );
}

function Home({
  location: { search: query },
  match: { params, url },
}: RouteComponentProps<ServerErrorFCProps>) {
  return (
    <>
      {/* Meta content */}
      {homeMetaDataComponents()}
      {/* Body content */}
      <main>
        <h1>{title}</h1>
      </main>
    </>
  );
}

export { Home };
