import React from 'react';
import {Toolbar, Page} from 'react-onsenui';
import WeeklySetList from './weekly-set/weekly-set-list/WeeklySetList';

const renderToolbar = () =>
    <Toolbar>
        <div className="center">Heizung</div>
    </Toolbar>


const MainPage = () =>
    <Page renderToolbar={renderToolbar}>
        <WeeklySetList />
    </Page>

export default MainPage
