import React from 'react';
import {observer} from 'mobx-react';
import {ListItem, Input, Button, Icon} from 'react-onsenui';
import "./HeatingTime.css";

const HeatingTime = observer(({time, i}) => {

    const removeHeatingTime = () => {
    }

    return (
        <ListItem modifier="longdivider" className="HeatingTime">
            <div className="center" style={{ display: 'flex' }}>
                <div style={{ width: 50 }}>
                    <Input value={time.start} modifier="underbar" />
                </div>
                <div style={{ margin: '0 10px' }}>-</div>
                <div style={{ width: 50 }}>
                    <Input value={time.stop} modifier="underbar" />
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
export default HeatingTime
