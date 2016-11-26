import React, {PropTypes} from 'react';
import {observer} from 'mobx-react';
import {Toolbar, Page, List, ListItem} from 'react-onsenui';
import PopPageBackButton from '../PopPageBackButton';
import WeekdayPage from './WeekdayPage';


const WeeklySetPage = observer(({weeklySet}) => {

    const renderToolbar = () => {
        return (
            <Toolbar>
                <div className='left'><PopPageBackButton /></div>
                <div className="center">{weeklySet.name}</div>
            </Toolbar>
        )
    }

    return (
        <Page renderToolbar={renderToolbar}>
            <List dataSource={weeklySet.weekdays.slice()}
                  renderRow={(row, i) => <WeekdayListItem heatingTimes={row} weekDayIndex={i} key={i} />} />
        </Page>
    )
})
export default WeeklySetPage


const WeekdayListItem = observer(({heatingTimes, weekDayIndex}, {navigator}) => {

    const weekDayName = WeekdayListItem.weekDayNames[weekDayIndex] || '?'
    const heatingTimesText = heatingTimes.map(t => `${t.start} - ${t.end}` ).join(', ')

    const showWeekdayPage = () => {
        navigator.pushPage({
            render: () => <WeekdayPage weekDayName={weekDayName} heatingTimes={heatingTimes} />
        })
    }

    return (
        <ListItem key={weekDayIndex} tappable onClick={showWeekdayPage}>
            <div className="left" style={{ width: 100 }}>
                {weekDayName}
            </div>
            <div className="center" style={{ fontSize: 10 }}>
                {heatingTimesText}
            </div>
        </ListItem>
    )
})
WeekdayListItem.weekDayNames = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag']
WeekdayListItem.contextTypes = {
    navigator: PropTypes.object.isRequired
}
