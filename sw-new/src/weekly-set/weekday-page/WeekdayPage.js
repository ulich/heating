import React from 'react';
import {observer} from 'mobx-react';
import {Toolbar, List, Icon} from 'react-onsenui';
import LoadingAwarePage from '../../utils/LoadingAwarePage';
import PopPageBackButton from '../../utils/PopPageBackButton';
import FabButton from '../../utils/FabButton';
import HeatingTime from './HeatingTime';

const WeekdayPage = observer(({weekDayName, heatingTimes}) => {
    
    const heatingTimeComponents = heatingTimes.map((h) => null)

    const addHeatingTime = () => {
        heatingTimes.push({ start: "", stop: "" })
    }

    const deleteHeatingTime = (time) => {
        const i = heatingTimes.indexOf(time)
        heatingTimes.splice(i, 1)
        heatingTimeComponents.splice(i, 1)
    }

    const hasInvalidHeatingTime = () => {
        return heatingTimeComponents.find((c) => !c.form.valid) !== undefined
    }

    const confirmBackPress = () => {
        if (hasInvalidHeatingTime()) {
            return false
        }

        heatingTimes.forEach((time, i) => {
            Object.assign(time, heatingTimeComponents[i].form.getModel())
        })

        return true
    }

    const renderToolbar = () =>
        <Toolbar>
            <div className="left"><PopPageBackButton confirm={confirmBackPress} /></div>
            <div className="center">{weekDayName}</div>
        </Toolbar>

    const renderRow = (row, i) =>
        <HeatingTime time={row}
                     onDelete={deleteHeatingTime}
                     ref={(e) => { heatingTimeComponents[i] = e }}
                     key={i} />

    return (
        <LoadingAwarePage renderToolbar={renderToolbar}>
            <List dataSource={heatingTimes.slice()}
                  renderRow={renderRow} />

            <FabButton onClick={addHeatingTime}>
                <Icon icon="md-plus" />
            </FabButton>
        </LoadingAwarePage>
    )
})
export default WeekdayPage
