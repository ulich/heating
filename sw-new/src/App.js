import React from 'react';
import { Router, Route, Redirect, hashHistory } from 'react-router';
import MainPage from './MainPage';
import WeeklySetsPage from './weekly-set/WeeklySetsPage';
import WeeklySetPage from './weekly-set/WeeklySetPage';
import WeekdayPage from './weekly-set/WeekdayPage';

function App() {
    return (
        <Router history={hashHistory}>
            <Route path="/" component={MainPage} />
            <Route path="/sets" component={WeeklySetsPage} />
            <Route path="/sets/:weeklySetIndex" component={WeeklySetPage} />
            <Route path="/sets/:weeklySetIndex/weekdays/:weekdayIndex" component={WeekdayPage} />
            <Redirect from="/**" to="/" />
        </Router>
    )
}

export default App
