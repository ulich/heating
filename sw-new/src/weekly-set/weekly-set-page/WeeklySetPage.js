import React from 'react';
import {observer} from 'mobx-react';
import {Toolbar, List, ListHeader, Input} from 'react-onsenui';
import LoadingAwarePage from '../../utils/LoadingAwarePage';
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
        <LoadingAwarePage renderToolbar={renderToolbar}>
            <section style={{margin: '30px 15px 15px 15px'}}>
                <Input value={weeklySet.name}
                       onChange={(e) => weeklySet.name = e.target.value}
                       placeholder="Name"
                       modifier="material"
                       float
                       style={{width: '100%'}} />
            </section>

            <List dataSource={weeklySet.weekdays.slice()}
                  renderHeader={() => <ListHeader>Wochentage</ListHeader>}
                  renderRow={(row, i) => <WeekdayListItem heatingTimes={row} weekDayIndex={i} key={i} />} />
        </LoadingAwarePage>
    )
})
export default WeeklySetPage