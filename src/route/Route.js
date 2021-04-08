import React from 'react';
import Layout from '../layout';
import { routes } from '../constant/routes-main';
import { Route, Switch, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

function RouteWrapper() {
  const location = useLocation();
  return (
    <div>
      <Layout>
        <AnimatePresence exitBeforeEnter>
          <Switch>
            {routes.map((route, index) => {
              return <Route key={index} {...route} />;
            })}
          </Switch>
        </AnimatePresence>
      </Layout>
    </div>
  );
}

export default RouteWrapper;