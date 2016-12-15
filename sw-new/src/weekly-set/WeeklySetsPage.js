import React from 'react';
import {observer} from 'mobx-react';
import {withRouter} from 'react-router';
import {List, ListItem} from 'material-ui/List';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Divider from 'material-ui/Divider';
import {store} from '../Store';
import LoadingAwareAppBar from '../utils/LoadingAwareAppBar';
import BackButton from '../utils/BackButton';
import Icon from '../utils/Icon';
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
                          rightIcon={<Icon name="create" />}
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
                <Icon name="add" />
            </FloatingActionButton>
        </div>
    )
}
export default withRouter(observer(WeeklySetsPage))
