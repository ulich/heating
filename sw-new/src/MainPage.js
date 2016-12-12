import React from 'react';
import {observer} from 'mobx-react';
import LoadingAwareAppBar from './utils/LoadingAwareAppBar';
import WeeklySetList from './weekly-set/WeeklySetList';
import SpecialTimes from './special-times/SpecialTimes';
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
                    <SpecialTimes specialTimes={store.config.specials} />
                </div>
            )
        }
    }

    return (
        <div>
            <LoadingAwareAppBar title="Heizung" iconElementRight={<MainHeatingStatus />} />
            {content()}
        </div>
    )
}
export default observer(MainPage)


function MainHeatingStatus() {
    if (store.loaded) {
        return <HeatingStatus enabled={store.status.enabled} style={{ margin: 15 }} />
    } else {
        return null
    }
}
