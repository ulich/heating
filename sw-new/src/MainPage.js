import React from 'react';
import {observer} from 'mobx-react';
import LoadingAwareAppBar from './utils/LoadingAwareAppBar';
import WeeklySetList from './weekly-set/WeeklySetList';
import HeatingStatus from './heating-status/HeatingStatus';
import {store} from './Store';


function MainPage() {
    const content = () => {
        if (!store.loaded) {
            return null
        } else {
            return (
                <div>
                    <WeeklySetList weeklyConfig={store.config.weekly} />
                </div>
            )
        }
    }

    return (
        <div>
            <LoadingAwareAppBar title="Heizung" iconElementRight={<HeatingStatus />} />
            {content()}
        </div>
    )
}
export default observer(MainPage)
