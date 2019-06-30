import './sass/index.scss';
import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import NotFoundExceptionScreen from "./screens/Exceptions/NotFoundExceptionScreen";
import HomeScreen from "./screens/HomeScreen";
import TrafficScreen from "./screens/TrafficScreen";
import LinesScreen from "./screens/LinesScreen";
import SchedulesScreen from "./screens/SchedulesScreen";

const App = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={HomeScreen} />
            <Route exact path="/traffics" component={TrafficScreen} />
            <Route exact path="/lines" component={LinesScreen} />
            <Route exact path="/schedules" component={SchedulesScreen} />

            {/* Last Route is 404 Not Found, if it doesn't find any of these route, show 404 */}
            <Route component={NotFoundExceptionScreen} />
        </Switch>
    </BrowserRouter>
);

export default App;
