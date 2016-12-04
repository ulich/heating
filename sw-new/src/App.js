import React from 'react';
import { Router, Route, Redirect, hashHistory } from 'react-router';
import MainPage from './MainPage';
import WeeklySetsPage from './weekly-set/WeeklySetsPage';

function App() {
    return (
        <Router history={hashHistory}>
            <Route path="/" component={MainPage} />
            <Route path="/sets" component={WeeklySetsPage} />
            <Redirect from="/**" to="/" />
        </Router>
    )
}

export default App
