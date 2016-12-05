import React from 'react';
import { Router, Route, Redirect, hashHistory } from 'react-router';
import MainPage from './MainPage';
import WeeklySetsPage from './weekly-set/WeeklySetsPage';
import WeeklySetPage from './weekly-set/WeeklySetPage';

function App() {
    return (
        <Router history={hashHistory}>
            <Route path="/" component={MainPage} />
            <Route path="/sets" component={WeeklySetsPage} />
            <Route path="/sets/:index" component={WeeklySetPage} />
            <Redirect from="/**" to="/" />
        </Router>
    )
}

export default App
