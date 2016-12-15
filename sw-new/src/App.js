import React from 'react';
import { Router, Route, Redirect, hashHistory } from 'react-router';
import MainPage from './MainPage';
import LoginPage from './LoginPage';
import WeeklySetPage from './weekly-set/WeeklySetPage';
import WeekdayPage from './weekly-set/WeekdayPage';
import SpecialTimePage from './special-times/SpecialTimePage';

function App() {
    return (
        <Router history={hashHistory}>
            <Route path="/" component={MainPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/sets/:weeklySetIndex" component={WeeklySetPage} />
            <Route path="/sets/:weeklySetIndex/weekdays/:weekdayIndex" component={WeekdayPage} />
            <Route path="/specials/:specialTimeIndex" component={SpecialTimePage} />
            <Redirect from="/**" to="/" />
        </Router>
    )
}

export default App
