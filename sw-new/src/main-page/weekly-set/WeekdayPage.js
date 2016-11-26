import React from 'react';
import {observer} from 'mobx-react';
import {Toolbar, Page, List, ListItem, Input, Button, Icon} from 'react-onsenui';
import PopPageBackButton from '../PopPageBackButton';
import FabButton from './FabButton';
import "./WeekdayPage.css";

const WeekdayPage = observer(({weekDayName, heatingTimes}) => {
    
    const addHeatingTime = () => {
    }

    const renderToolbar = () =>
        <Toolbar>
            <div className="left"><PopPageBackButton /></div>
            <div className="center">{weekDayName}</div>
        </Toolbar>


    return (
        <Page renderToolbar={renderToolbar} className="WeekdayPage">
            <List dataSource={heatingTimes.slice()}
                  renderRow={(row, i) => <HeatingTime time={row} i={i} key={i} />} />

            <FabButton onClick={addHeatingTime}>
                <Icon icon="md-plus" />
            </FabButton>
        </Page>
    )
})
export default WeekdayPage


const HeatingTime = observer(({time, i}) => {

    const removeHeatingTime = () => {
    }

    return (
        <ListItem modifier="longdivider">
            <div className="center" style={{ display: 'flex' }}>
                <div style={{ width: 50 }}>
                    <Input value={time.start} modifier="underbar" />
                </div>
                <div style={{ margin: '0 10px' }}>-</div>
                <div style={{ width: 50 }}>
                    <Input value={time.end} modifier="underbar" />
                </div>
            </div>
            <div className="right">
                <Button modifier="quiet" onClick={removeHeatingTime}>
                    <Icon icon="md-delete" className="delete-button"/>
                </Button>
            </div>
        </ListItem>
    )
})
