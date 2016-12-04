import React from 'react';
import MainPage from './MainPage';

import { Router, Route, browserHistory } from 'react-router'

const App = () =>
    <Router history={browserHistory}>
        <Route path="/" component={MainPage}>
        </Route>
    </Router>

export default App
