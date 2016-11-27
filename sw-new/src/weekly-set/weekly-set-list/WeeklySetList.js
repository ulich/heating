import React from 'react';
import {observer} from 'mobx-react';
import {List, ListHeader} from 'react-onsenui';
import WeeklySetListItem from './WeeklySetListItem';

const WeeklySetList = observer(({weeklyConfig}) => {

    const selectSet = (i) => {
        weeklyConfig.activeSet = i
    }

    const RowRenderer = observer(({set, i}) =>
        <WeeklySetListItem set={set}
                           selected={weeklyConfig.activeSet === i}
                           onSelect={() => selectSet(i)} />
    )

    return (
        <List dataSource={weeklyConfig.sets.slice()}
              renderHeader={() => <ListHeader>Heiz-Konfiguration</ListHeader>}
              renderRow={(set, i) => <RowRenderer set={set} i={i} key={i} />} />
    )
})
export default WeeklySetList
