import React from 'react';
import {withRouter} from 'react-router';
import {observer} from 'mobx-react';
import IconButton from 'material-ui/IconButton';
import LoadingAwareAppBar from './utils/LoadingAwareAppBar';
import HeatingStatus from './heating-status/HeatingStatus';
import {store} from './Store';


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
                <div>
                    <HeatingStatus status={store.status} />
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
