import React from 'react';
import {withRouter} from 'react-router';
import {observer} from 'mobx-react';
import Divider from 'material-ui/Divider';
import TimePicker from 'material-ui/TimePicker';
import IconButton from 'material-ui/IconButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import LoadingAwareAppBar from '../utils/LoadingAwareAppBar';
import BackButton from '../utils/BackButton';
import Icon from '../utils/Icon';
import {padTo2} from '../utils/StringUtils';
import {store} from '../Store';
import {mondayFirst, weekdayNames} from './Weekday';

function WeekdayPage({router}) {

    store.autoSave = false
    
    const weeklySetIndex = parseInt(router.params.weeklySetIndex, 10)
    const weekdayIndex = parseInt(router.params.weekdayIndex, 10)
    if (weeklySetIndex >= store.config.weekly.sets.length || weekdayIndex < 0 || weekdayIndex > 6) {
        return null
    }

    const heatingTimes = mondayFirst(store.config.weekly.sets[weeklySetIndex].weekdays)[weekdayIndex]


    const addHeatingTime = () => {
        heatingTimes.push({ start: "08:00", stop: "20:00" })
    }

    const deleteHeatingTime = (index) => {
        heatingTimes.splice(index, 1)
    }

    const confirmBackPress = () => {
        store.saveConfigIfChanged()
        return true
    }

    const renderHeatingTime = (time, index) =>
        <div key={index}>
            {(index === 0) ? null : <Divider />}
            <div style={{ display: 'flex', alignItems: 'center', margin: '10px 10px 10px 20px' }}>
                <div style={{ width: 40 }}>
                    <HeatingTime name="start" time={time} />
                </div>
                <div style={{ margin: '0 10px' }}>-</div>
                <div style={{ width: 40 }}>
                    <HeatingTime name="stop" time={time} />
                </div>
                <div style={{ flex: '1 1' }}></div>
                <div style={{ flex: '0 0' }}>
                    <IconButton iconClassName="material-icons"
                                onClick={() => deleteHeatingTime(index)}>
                        delete
                    </IconButton>
                </div>
            </div>
        </div>

    return (
        <div>
            <LoadingAwareAppBar title={weekdayNames[weekdayIndex]}
                                iconElementLeft={<BackButton route={`/settings/sets/${weeklySetIndex}`} confirm={confirmBackPress} />} />

            {heatingTimes.map(renderHeatingTime)}

            <FloatingActionButton onClick={addHeatingTime} style={{ position: 'fixed', bottom: 30, right: 30 }}>
                <Icon name="add" />
            </FloatingActionButton>
        </div>
    )
}
export default withRouter(observer(WeekdayPage))


function HeatingTime({time, name}) {
    const [hour, minute] = time[name].split(':')
    const date = new Date(0, 0, 0, parseInt(hour, 10), parseInt(minute, 10), 0)

    const onChange = (e, newDate) => {
        time[name] = `${padTo2(newDate.getHours())}:${padTo2(newDate.getMinutes())}`
    }

    return (
        <TimePicker format="24hr" value={date} onChange={onChange} name={name} cancelLabel="Abbrechen" fullWidth={true} />
    )
}
