import React from 'react';
import {observer} from 'mobx-react';
import {Toolbar, List, ListHeader, Input, Button} from 'react-onsenui';
import LoadingAwarePage from '../../utils/LoadingAwarePage';
import PopPageBackButton from '../../utils/PopPageBackButton';
import WeekdayListItem from './WeekdayListItem';
import {store} from '../../Store';


const WeeklySetPage = observer(({weeklySet}, {navigator}) => {

    store.autoSave = false

    const onPageLeave = () => {
        store.saveConfigIfChanged()
        store.autoSave = true
    }

    const confirmBackPress = () => {
        onPageLeave()
        return true
    }

    const renderToolbar = () => {
        return (
            <Toolbar>
                <div className='left'><PopPageBackButton confirm={confirmBackPress} /></div>
                <div className="center">{weeklySet.name}</div>
            </Toolbar>
        )
    }

    const mondayFirst = (weekdays) => {
        const weekdaysShallowCopy = weekdays.slice()
        weekdaysShallowCopy.push(weekdaysShallowCopy.shift())
        return weekdaysShallowCopy
    }

    const deleteWeeklySet = () => {
        if (confirm("Wirklich löschen?")) {
            store.deleteWeeklySet(weeklySet)
            onPageLeave()
            navigator.popPage()
        }
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

            <List dataSource={mondayFirst(weeklySet.weekdays)}
                  renderHeader={() => <ListHeader>Wochentage</ListHeader>}
                  renderRow={(row, i) => <WeekdayListItem heatingTimes={row} weekDayIndex={i} key={i} />} />

            <div style={{ margin: '40px 15px' }}>
                <Button modifier="large" style={{ backgroundColor: '#f44336' }} onClick={deleteWeeklySet}>Löschen</Button>
            </div>
        </LoadingAwarePage>
    )
})
WeeklySetPage.contextTypes = {
    navigator: React.PropTypes.object.isRequired
}
export default WeeklySetPage
