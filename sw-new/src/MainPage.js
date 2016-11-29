import React from 'react';
import {observer} from 'mobx-react';
import {Toolbar, SpeedDial, SpeedDialItem, Icon} from 'react-onsenui';
import LoadingAwarePage from './utils/LoadingAwarePage';
import FabButton from './utils/FabButton';
import WeeklySetList from './weekly-set/weekly-set-list/WeeklySetList';
import WeeklySetPage from './weekly-set/weekly-set-page/WeeklySetPage';
import HeatingStatus from './heating-status/HeatingStatus';
import {store} from './Store';


export default observer(class MainPage extends React.Component {

    static contextTypes = {
        navigator: React.PropTypes.object.isRequired
    }

    componentDidMount() {
        store.load()
    }

    addWeeklySet() {
        store.autoSave = false
        const set = store.addWeeklySet()

        this.context.navigator.pushPage({
            render: () => <WeeklySetPage weeklySet={set} />,
        })
    }

    renderToolbar() {
        return (
            <Toolbar>
                <div className="center">Heizung</div>
                <div className="right"><HeatingStatus /></div>
            </Toolbar>
        )
    }

    content() {
        if (!store.loaded) {
            return null
        } else if (store.error) {
            return <div><p>Es ist ein Fehler aufgetreten:</p><p>{store.error.message}</p></div>
        } else {
            return (
                <div>
                    <WeeklySetList weeklyConfig={store.config.weekly} />
                    <SpeedDial position="bottom right">
                        <FabButton>
                            <Icon icon="md-plus" />
                        </FabButton>
                        <SpeedDialItem>
                            <Icon icon="md-time" />
                        </SpeedDialItem>
                        <SpeedDialItem onClick={this.addWeeklySet.bind(this)}>
                            <Icon icon="md-calendar" />
                        </SpeedDialItem>
                    </SpeedDial>
                </div>
            )
        }
    }

    render() {
        return (
            <LoadingAwarePage renderToolbar={this.renderToolbar.bind(this)}>
                {this.content()}
            </LoadingAwarePage>
        )
    }

})
