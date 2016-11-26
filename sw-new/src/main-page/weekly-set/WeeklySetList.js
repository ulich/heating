import React, {PropTypes} from 'react';
import {observer} from 'mobx-react';
import {List, ListItem, ListHeader, Input, Button, Icon} from 'react-onsenui';
import {weeklySetStore} from './WeeklySetStore';
import WeeklySetPage from './WeeklySetPage';

const WeeklySetList = observer(() => {
    return (
        <List dataSource={weeklySetStore.sets.slice()}
              renderHeader={() => <ListHeader>Heiz-Konfiguration</ListHeader>}
              renderRow={(set, i) => <WeeklySetListItem set={set} index={i} key={i} />} />
    )
})
export default WeeklySetList


const WeeklySetListItem = observer(({set, index}, {navigator}) => {

    const showWeeklySetPage = () => {
        navigator.pushPage({
            render: () => <WeeklySetPage weeklySet={set} />,
        })
    }

    const onSelect = () => {
        weeklySetStore.activeSetIndex = index
    }

    const id = 'weekly-' + btoa(set.name)
    return (
        <ListItem tappable>
            <label className="left">
                <Input type="radio"
                       inputId={id}
                       checked={index === weeklySetStore.activeSetIndex}
                       onChange={onSelect} />
            </label>
            <label className="center" htmlFor={id}>
                {set.name}
            </label>
            <div className="right">
                <Button modifier="quiet" onClick={showWeeklySetPage}>
                    <Icon icon="md-edit" />
                </Button>
            </div>
        </ListItem>
    )
})
WeeklySetListItem.contextTypes = {
    navigator: PropTypes.object.isRequired
}
