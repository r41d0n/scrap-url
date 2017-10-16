//Dependencies
import React from 'react';
import { Route, Switch } from 'react-router-dom';

//Components
import App from './components/App';
import Scrap from './components/Scrap';
import Search from './components/Search';
import Page404 from './components/Page404';

// import Home from './containers/Home';


const AppRoutes = () =>
    <App>
        <Switch>
            <Route exact path="/Search" component={Search} />
            <Route exact path="/" component={Scrap} />
            <Route component={Page404} />
        </Switch>
    </App>

export default AppRoutes;

            // <Route exact path="/" component={Home} />