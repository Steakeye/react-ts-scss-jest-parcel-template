import * as React from 'react';
import Helmet from 'react-helmet';
import * as ReactDOM from 'react-dom';
import { Optional } from '~/app/declarations/standard';
import { Dispatch, useEffect } from 'react';
import { SetStateAction } from 'react';

const { useState } = React;

function ExtractJSONLDDataAndInsertIntoHelmet(
  props: React.PropsWithChildren<{ children: React.ReactNode }>
) {
  let jsonLDData: Optional<string>;
  let setJsonLDNode: Dispatch<SetStateAction<Optional<string>>>;

  // eslint-disable-next-line prefer-const
  [jsonLDData, setJsonLDNode] = useState<Optional<string>>(undefined);

  useEffect(() => {
    if (!jsonLDData) {
      const myContainer = document.createElement('div');

      ReactDOM.render(props.children as React.ReactElement, myContainer, () => {
        const scriptContent = myContainer.childNodes[0].textContent;
        setJsonLDNode(scriptContent);
      });
    }
  }, []);

  return jsonLDData ? (
    <Helmet>
      <script type="application/ld+json">{jsonLDData}</script>
    </Helmet>
  ) : (
    <></>
  );
}

export { ExtractJSONLDDataAndInsertIntoHelmet as JSONLDHelmetWrapper };
