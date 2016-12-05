import React from 'react';
import {withRouter} from 'react-router';
import {observer} from 'mobx-react';
import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import LoadingAwareAppBar from '../utils/LoadingAwareAppBar';
import BackButton from '../utils/BackButton';
import {store} from '../Store';
import WeeklySetName from './WeeklySetName';


function WeeklySetPage({router}) {

    store.autoSave = false

    const weeklySetIndex = router.params.index
    if (weeklySetIndex >= store.config.weekly.sets.length) {
        return null
    }

    const weeklySet = store.config.weekly.sets[parseInt(weeklySetIndex, 10)]

    const onPageLeave = () => {
        store.saveConfigIfChanged()
        store.autoSave = true
    }

    const confirmBackPress = () => {
        onPageLeave()
        return true
    }

    const showWeekdayPage = (weekDayIndex) => {
        router.push(`/sets/${weeklySetIndex}/weekday/${weekDayIndex}`)
    }

    const deleteWeeklySet = () => {
        if (confirm("Wirklich löschen?")) {
            store.deleteWeeklySet(weeklySet)
            onPageLeave()
            router.push(`/sets`)
        }
    }

    return (
        <div>
            <LoadingAwareAppBar title={<WeeklySetName name={weeklySet.name} />}
                                iconElementLeft={<BackButton route="/sets" confirm={confirmBackPress} />} />

            <section style={{margin: '5px 15px 30px 15px'}}>
                <TextField value={weeklySet.name}
                           onChange={(e) => weeklySet.name = e.target.value}
                           floatingLabelText="Name"
                           fullWidth={true} />
            </section>

            <WeekdayList weekdays={weeklySet.weekdays} onClickWeekday={showWeekdayPage} />

            <section style={{margin: '30px 15px 5px 15px'}}>
                <RaisedButton onClick={deleteWeeklySet}
                              label="Löschen"
                              secondary={true}
                              fullWidth={true} />
            </section>
        </div>
    )
}
export default withRouter(observer(WeeklySetPage))



const weekDayNames = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag']

function WeekdayList({weekdays, onClickWeekday}) {

    const mondayFirst = (weekdays) => {
        const weekdaysShallowCopy = weekdays.slice()
        weekdaysShallowCopy.push(weekdaysShallowCopy.shift())
        return weekdaysShallowCopy
    }

    const heatingTimesText = (heatingTimes) => {
        if (heatingTimes.length > 0) {
            return heatingTimes.map(t => `${t.start} - ${t.stop}` ).join(', ')
        } else {
            return 'Keine Heizzeiten'
        }
    }

    const renderWeekday = (weekday, index) => {
        return (
            <div key={index}>
                {(index === 0) ? null : <Divider />}
                <ListItem key={index} onClick={() => onClickWeekday(index)}>
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: 100 }}>
                            {weekDayNames[index] || '?'}
                        </div>
                        <div style={{ fontSize: 10, flex: '1 1' }}>
                            {heatingTimesText(weekday)}
                        </div>
                    </div>
                </ListItem>
            </div>
        )
    }

    return (
        <List>
            {mondayFirst(weekdays).map(renderWeekday)}
        </List>
    )
}
