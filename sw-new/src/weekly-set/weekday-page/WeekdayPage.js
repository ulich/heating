import React from 'react';
import {observer} from 'mobx-react';
import {Toolbar, Page, List, Icon} from 'react-onsenui';
import PopPageBackButton from '../../utils/PopPageBackButton';
import FabButton from '../FabButton';
import HeatingTime from './HeatingTime';

const WeekdayPage = observer(({weekDayName, heatingTimes}) => {
    
    const addHeatingTime = () => {
    }

    const renderToolbar = () =>
        <Toolbar>
            <div className="left"><PopPageBackButton /></div>
            <div className="center">{weekDayName}</div>
        </Toolbar>


    return (
        <Page renderToolbar={renderToolbar}>
            <List dataSource={heatingTimes.slice()}
                  renderRow={(row, i) => <HeatingTime time={row} i={i} key={i} />} />

            <FabButton onClick={addHeatingTime}>
                <Icon icon="md-plus" />
            </FabButton>
        </Page>
    )
})
export default WeekdayPage
