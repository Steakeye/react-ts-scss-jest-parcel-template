import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthenticatedRoute } from '~/app/AuthenticatedRoute';
import { Stores } from './stores/Stores';
import { AppHistory } from './AppHistory';
import { AppRoutes } from './AppRoutes';

const supportsHistory = 'pushState' in window.history;

function App() {
  return (
    <Router forceRefresh={!supportsHistory}>
      <Stores>
        {/* AppHistory handles global navigation events, use it where you need to hook into that event */}
        <AppHistory>
          <Switch>
            {AppRoutes.filter(routeConfig => !routeConfig.disabled).map(
              routeConfig => {
                return routeConfig.requiresAuth ? (
                  <AuthenticatedRoute
                    {...routeConfig}
                    key={`${JSON.stringify(routeConfig.path)}`}
                  />
                ) : (
                  <Route
                    {...routeConfig}
                    key={`${JSON.stringify(routeConfig.path)}`}
                  />
                );
              }
            )}
          </Switch>
        </AppHistory>
      </Stores>
    </Router>
  );
}

export { App };
