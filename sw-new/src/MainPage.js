import React from 'react';
import {observer} from 'mobx-react';
import LoadingAwareAppBar from './utils/LoadingAwareAppBar';
//import FabButton from './utils/FabButton';
//import WeeklySetList from './weekly-set/weekly-set-list/WeeklySetList';
//import WeeklySetPage from './weekly-set/weekly-set-page/WeeklySetPage';
import HeatingStatus from './heating-status/HeatingStatus';
import {store} from './Store';


export default observer(class MainPage extends React.Component {

    componentDidMount() {
        store.load()
    }

    // addWeeklySet() {
    //     store.autoSave = false
    //     const set = store.addWeeklySet()

    //     this.context.navigator.pushPage({
    //         render: () => <WeeklySetPage weeklySet={set} />,
    //     })
    // }

    content() {
        if (!store.loaded) {
            return null
        } else {
            return (
                <div>
                {/*
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
                */}
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <LoadingAwareAppBar title="Heizung" iconElementRight={<HeatingStatus />} />
                {this.content()}
            </div>
        )
    }

})
