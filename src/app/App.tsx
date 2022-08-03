import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthenticatedRoute } from '~/app/AuthenticatedRoute';
import { Stores } from './stores/Stores';
import { AppHistory } from './AppHistory';
import { AppRoutes } from './AppRoutes';

//const supportsHistory = 'pushState' in window.history;

function App() {
  return (
    /*<Router forceRefresh={!supportsHistory}>*/
    <Router>
      <Stores>
        {/* AppHistory handles global navigation events, use it where you need to hook into that event */}
        <AppHistory>
          <Routes>
            {AppRoutes.filter(routeConfig => !routeConfig.disabled).map(
              routeConfig => {
                const {
                  component: View,
                  requiresAuth,
                  ...restOfRouteConfig
                } = routeConfig;

                return requiresAuth ? (
                  <Route key={`${JSON.stringify(routeConfig.path)}`}>
                    <AuthenticatedRoute {...routeConfig} />
                  </Route>
                ) : (
                  <Route
                    {...restOfRouteConfig}
                    element={<View />}
                    key={`${JSON.stringify(routeConfig.path)}`}
                  />
                );
              }
            )}
          </Routes>
        </AppHistory>
      </Stores>
    </Router>
  );
}

export { App };
