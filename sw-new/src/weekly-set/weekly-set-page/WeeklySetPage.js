import React from 'react';
import {observer} from 'mobx-react';
import {Toolbar, Page, List} from 'react-onsenui';
import PopPageBackButton from '../../utils/PopPageBackButton';
import WeekdayListItem from './WeekdayListItem';


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
