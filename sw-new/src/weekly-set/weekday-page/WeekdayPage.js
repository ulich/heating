import React from 'react';
import {observer} from 'mobx-react';
import {Toolbar, List, Icon} from 'react-onsenui';
import LoadingAwarePage from '../../utils/LoadingAwarePage';
import PopPageBackButton from '../../utils/PopPageBackButton';
import FabButton from '../FabButton';
import HeatingTime from './HeatingTime';

const WeekdayPage = observer(({weekDayName, heatingTimes}) => {
    
    const addHeatingTime = () => {
    }

    const deleteHeatingTime = (time) => {
        const i = heatingTimes.indexOf(time)
        heatingTimes.splice(i, 1)
    }

    const renderToolbar = () =>
        <Toolbar>
            <div className="left"><PopPageBackButton /></div>
            <div className="center">{weekDayName}</div>
        </Toolbar>


    return (
        <LoadingAwarePage renderToolbar={renderToolbar}>
            <List dataSource={heatingTimes.slice()}
                  renderRow={(row, i) => <HeatingTime time={row} onDelete={deleteHeatingTime} key={i} />} />

            <FabButton onClick={addHeatingTime}>
                <Icon icon="md-plus" />
            </FabButton>
        </LoadingAwarePage>
    )
})
export default WeekdayPage
