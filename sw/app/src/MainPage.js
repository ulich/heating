import React from 'react';
import {withRouter} from 'react-router';
import {observer} from 'mobx-react';
import {SpeedDial, SpeedDialItem} from 'react-mui-speeddial';
import LoadingAwareAppBar from './utils/LoadingAwareAppBar';
import WeeklySetList from './weekly-set/WeeklySetList';
import SpecialTimes from './special-times/SpecialTimes';
import HeatingStatus from './heating-status/HeatingStatus';
import Icon from './utils/Icon';
import {store} from './Store';


function MainPage({router}) {

    const addWeeklySet = (e) => {
        e.preventDefault()

        store.autoSave = false
        const index = store.addWeeklySet()

        router.push(`/sets/${index}`)
    }

    const addSpecialHeatingTime = (e) => {
        e.preventDefault()

        store.autoSave = false
        const index = store.addSpecialHeatingTime()

        router.push(`/specials/${index}`)
    }

    const content = () => {
        if (!store.loaded) {
            return null
        } else {
            return (
                <div>
                    <WeeklySetList weeklyConfig={store.config.weekly} />
                    <SpecialTimes specialTimes={store.config.specials} />

                    <div style={{ position: 'fixed', bottom: 30, right: 30 }}>
                        <SpeedDial fabContentOpen={<Icon name="add" />} effect="slide">
                            <SpeedDialItem fabContent={<Icon name="beach_access" />}
                                           label={<SpeedDialLabel label="Neue spezielle Heizzeit" />}
                                           onTouchTap={addSpecialHeatingTime} />

                            <SpeedDialItem fabContent={<Icon name="event_note" />}
                                           label={<SpeedDialLabel label="Neue wochen Konfiguration" />}
                                           onTouchTap={addWeeklySet} />
                        </SpeedDial>
                    </div>
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
export default withRouter(observer(MainPage))


function MainHeatingStatus() {
    if (store.loaded) {
        return <HeatingStatus status={store.status} style={{ margin: 15 }} />
    } else {
        return null
    }
}

const SpeedDialLabel = ({label}) =>
    <div style={{ background: 'white', padding: 10, border: '1px solid #ddd', borderRadius: 5 }}>{label}</div>