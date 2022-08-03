import React, { ReactElement, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Optional } from '~/app/declarations/standard';
import { getRouteConfigFromPath } from '~/app/AppRoutesUtils';
import { AppRoutes } from '~/app/AppRoutes';
import { ExtendedRouteProps } from '~/app/AppRoutes.d';
import { AppHistoryFC, AppHistoryProps } from './AppHistory.d';

function HistoryContainer(props: AppHistoryProps): ReactElement {
  useEffect(() => {
    //const { history, location: initialLocation } = props;
    const routeConfig: Optional<ExtendedRouteProps> = getRouteConfigFromPath(
      location.pathname,
      AppRoutes
    );
    const { scrollToTop } = routeConfig as ExtendedRouteProps;

    if (scrollToTop) {
      window.scrollTo(0, 0);
    }
  }, [props]);

  return <>{props.children}</>;
}

const withHistory = withRouter<AppHistoryProps, AppHistoryFC>(HistoryContainer);

export { withHistory as AppHistory };
