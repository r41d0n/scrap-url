//Dependencies
import React from 'react';
import { Route, Switch } from 'react-router-dom';

//Components
import App from './components/App';
import Scrap from './components/Scrap';
import Search from './components/Search';
import Page404 from './components/Page404';

const AppRoutes = () =>
    <App>
        <Switch>
            <Route exact path="/" component={Scrap} />
            <Route exact path="/Search" component={Search} />
            <Route component={Page404} />
        </Switch>
    </App>

export default AppRoutes;
