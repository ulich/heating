import React from 'react';
import {withRouter} from 'react-router';
import {observer} from 'mobx-react';
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import LoadingAwareAppBar from './utils/LoadingAwareAppBar';
import HeatingStatus from './heating-status/HeatingStatus';
import {store} from './Store';
import {getNextHeatingTriggerDate} from './HeatingCalendar';


function MainPage({router}) {

    const showSettingsPage = (e) => {
        e.preventDefault()
        router.push(`/settings`)
    }

    const content = () => {
        if (!store.loaded) {
            return null
        } else {
            return (
                <div style={{ textAlign: 'center', marginTop: 100 }}>
                    <div>Die Heizung ist momentan</div>
                    <Chip style={{ display: 'inline-block', backgroundColor: store.status.enabled ? '#05ef4b' : '#f40000', marginTop: 30 }}>
                        {(store.status.enabled ? 'ein' : 'aus') + 'geschaltet'}
                    </Chip>

                    <div style={{ marginTop: 100 }}>
                        <ActivationButton />
                    </div>
                </div>
            )
        }
    }

    const SettingsIcon = (
        <IconButton iconClassName="material-icons"
                    onClick={showSettingsPage}
                    iconStyle={{ color: 'white' }}>
            settings
        </IconButton>
    )

    return (
        <div>
            <LoadingAwareAppBar title="Heizung" iconElementRight={SettingsIcon} />
            {content()}
        </div>
    )
}
export default withRouter(observer(MainPage))


const ActivationButton = observer(() => {
    const nextTrigger = getNextHeatingTriggerDate(store.config)

    const enable = () => {
        store.enableHeatingUntil(nextTrigger)
    }

    if (!store.status.enabled && nextTrigger) {
        return <RaisedButton label="Vorübergehend einschalten" disabled={store.loading} onClick={enable} />
    } else {
        return null
    }
})
