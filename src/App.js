import './sass/index.scss';
import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import NotFoundExceptionScreen from "./screens/Exceptions/NotFoundExceptionScreen";
import HomeScreen from "./screens/HomeScreen";

const App = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={HomeScreen} />

            {/* Last Route is 404 Not Found, if it doesn't find any of these route, show 404 */}
            <Route component={NotFoundExceptionScreen} />
        </Switch>
    </BrowserRouter>
);

export default App;
