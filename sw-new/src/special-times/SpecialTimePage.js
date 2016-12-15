import React from 'react';
import {withRouter} from 'react-router';
import {observer} from 'mobx-react';
import Divider from 'material-ui/Divider';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import LoadingAwareAppBar from '../utils/LoadingAwareAppBar';
import BackButton from '../utils/BackButton';
import {store} from '../Store';


function WeeklySetPage({router}) {

    store.autoSave = false

    const specialTimeIndex = parseInt(router.params.specialTimeIndex, 10)
    if (specialTimeIndex >= store.config.specials.length) {
        return null
    }

    const specialTime = store.config.specials[specialTimeIndex]

    const onPageLeave = () => {
        store.saveConfigIfChanged()
        store.autoSave = true
    }

    const confirmBackPress = () => {
        onPageLeave()
        return true
    }

    // const deleteSpecialTime = () => {
    //     if (confirm("Wirklich löschen?")) {
    //         store.deleteWeeklySet(weeklySet)
    //         onPageLeave()
    //         router.push(`/sets`)
    //     }
    // }

    return (
        <div>
            <LoadingAwareAppBar title={`Spezielle Heizzeit ${specialTimeIndex + 1}`}
                                iconElementLeft={<BackButton route="/" confirm={confirmBackPress} />} />

            <Labeled label="Heizung">
                <OnOffInput specialTime={specialTime} />
            </Labeled>
            <Divider />
            <Labeled label="Von">
                <FromToInput name="start" specialTime={specialTime} />
            </Labeled>
            <Divider />
            <Labeled label="Bis">
                <FromToInput name="stop" specialTime={specialTime} />
            </Labeled>
        </div>
    )
}
export default withRouter(observer(WeeklySetPage))

const Labeled = ({label, children}) => 
    <div style={{ display: 'flex', alignItems: 'center', margin: 20 }}>
        <div style={{ width: 90 }}>
            {label}:
        </div>
        <div style={{ flex: '1 1' }}>
            {children}
        </div>
    </div>


function OnOffInput({specialTime}) {
    const style = { display: 'inline-block', width: 'auto' }
    const style2 = { ...style, marginLeft: 30 }
    return (
        <RadioButtonGroup name="enabled"
                          onChange={(e, value) => { specialTime.enabled = (value === 'on') }}
                          valueSelected={specialTime.enabled ? 'on' : 'off'} style={{ marginTop: 6 }}>
            <RadioButton value="on" label="an" style={style} />
            <RadioButton value="off" label="aus" style={style2} />
        </RadioButtonGroup>
    )
}

const FromToInput = observer(({specialTime, name}) => {
    const value = new Date(specialTime[name])

    const onChange = (e, newValue) => {
        specialTime[name] = newValue.getTime()
    }

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: 80 }}>
                <DatePicker name="date" value={value} onChange={onChange} fullWidth={true} locale="de-DE" DateTimeFormat={Intl.DateTimeFormat} />
            </div>
            <div style={{ width: 40, marginLeft: 15 }}>
                <TimePicker name="time" format="24hr" onChange={onChange} value={value} fullWidth={true} />
            </div>
        </div>
    )
})

