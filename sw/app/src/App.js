import React from 'react';
import { Router, Route, Redirect, hashHistory } from 'react-router';
import LoginPage from './LoginPage';
import MainPage from './MainPage';
import SettingsPage from './SettingsPage';
import WeeklySetPage from './weekly-set/WeeklySetPage';
import WeekdayPage from './weekly-set/WeekdayPage';
import SpecialTimePage from './special-times/SpecialTimePage';

function App() {
    return (
        <Router history={hashHistory}>
            <Route path="/" component={MainPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/settings" component={SettingsPage} />
            <Route path="/settings/sets/:weeklySetIndex" component={WeeklySetPage} />
            <Route path="/settings/sets/:weeklySetIndex/weekdays/:weekdayIndex" component={WeekdayPage} />
            <Route path="/settings/specials/:id" component={SpecialTimePage} />
            <Redirect from="/**" to="/" />
        </Router>
    )
}

export default App
