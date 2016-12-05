import React from 'react';
import {observer} from 'mobx-react';
import {withRouter} from 'react-router';
import {List, ListItem} from 'material-ui/List';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';
import Divider from 'material-ui/Divider';
import {store} from '../Store';
import LoadingAwareAppBar from '../utils/LoadingAwareAppBar';
import BackButton from '../utils/BackButton';
import WeeklySetName from './WeeklySetName';

function WeeklySetsPage({router}) {

    const showWeeklySetPage = (index) => {
        router.push(`/sets/${index}`)
    }

    const addWeeklySet = () => {
        store.autoSave = false
        const index = store.addWeeklySet()

        router.push(`/sets/${index}`)
    }

    const renderListItem = (set, index) => {
        return (
            <div key={index}>
                {(index === 0) ? null : <Divider />}
                <ListItem primaryText={<WeeklySetName name={set.name} />}
                          rightIcon={<FontIcon className="material-icons">create</FontIcon>}
                          onClick={() => showWeeklySetPage(index)}></ListItem>
            </div>
        )
    }

    return (
        <div>
            <LoadingAwareAppBar title="Wochen-Konfigurationen" iconElementLeft={<BackButton route="/" />} />
            <List>
                {store.config.weekly.sets.map(renderListItem)}
            </List>
            <FloatingActionButton style={{ position: 'fixed', bottom: 20, right: 20 }} onClick={addWeeklySet}>
                <FontIcon className="material-icons">add</FontIcon>
            </FloatingActionButton>
        </div>
    )
}
export default withRouter(observer(WeeklySetsPage))
