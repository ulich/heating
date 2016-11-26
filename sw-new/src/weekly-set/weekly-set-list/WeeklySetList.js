import React from 'react';
import {observer} from 'mobx-react';
import {List, ListHeader} from 'react-onsenui';
import {weeklySetStore} from '../WeeklySetStore';
import WeeklySetListItem from './WeeklySetListItem';

const WeeklySetList = observer(() => {
    return (
        <List dataSource={weeklySetStore.sets.slice()}
              renderHeader={() => <ListHeader>Heiz-Konfiguration</ListHeader>}
              renderRow={(set, i) => <WeeklySetListItem set={set} index={i} key={i} />} />
    )
})
export default WeeklySetList
