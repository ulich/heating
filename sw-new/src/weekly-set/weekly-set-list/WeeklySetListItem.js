import React, {PropTypes} from 'react';
import {ListItem, Input, Button, Icon} from 'react-onsenui';
import WeeklySetPage from '../weekly-set-page/WeeklySetPage';

const WeeklySetListItem = ({set, selected, onSelect}, {navigator}) => {

    const showWeeklySetPage = () => {
        navigator.pushPage({
            render: () => <WeeklySetPage weeklySet={set} />,
        })
    }

    const id = 'weekly-' + btoa(set.name)
    return (
        <ListItem tappable>
            <label className="left">
                <Input type="radio"
                       inputId={id}
                       checked={selected}
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
}
WeeklySetListItem.contextTypes = {
    navigator: PropTypes.object.isRequired
}
export default WeeklySetListItem
