import React from 'react';
import {withRouter} from 'react-router';
import {observer} from 'mobx-react';
import {SpeedDial, SpeedDialItem} from 'react-mui-speeddial';
import LoadingAwareAppBar from './utils/LoadingAwareAppBar';
import WeeklySetList from './weekly-set/WeeklySetList';
import SpecialTimes from './special-times/SpecialTimes';
import BackButton from './utils/BackButton';
import Icon from './utils/Icon';
import {store} from './Store';


function SettingsPage({router}) {

    const addWeeklySet = (e) => {
        e.preventDefault()

        store.autoSave = false
        const index = store.addWeeklySet()

        router.push(`/settings/sets/${index}`)
    }

    const addSpecialHeatingTime = (e) => {
        e.preventDefault()

        store.autoSave = false
        const id = store.addSpecialHeatingTime()

        router.push(`/settings/specials/${id}`)
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
            <LoadingAwareAppBar title="Einstellungen" iconElementLeft={<BackButton route="/" />} />
            {content()}
        </div>
    )
}
export default withRouter(observer(SettingsPage))

const SpeedDialLabel = ({label}) =>
    <div style={{ background: 'white', padding: 10, border: '1px solid #ddd', borderRadius: 5 }}>{label}</div>