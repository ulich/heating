import React from 'react';
import {withRouter} from 'react-router';
import {observer} from 'mobx-react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import {store} from '../Store';
import WeeklySetName from './WeeklySetName';

function WeeklySetList({weeklyConfig, router}) {

    store.autoSave = true

    const selectSet = (i) => {
        weeklyConfig.activeSet = i
    }

    const showWeeklySetsPage = () => {
        router.push('/sets')
    }

    const renderListItem = (set, i) => {
        return (
            <RadioButton key={i} value={i} label={<WeeklySetName name={set.name} />} style={{ marginBottom: 30, paddingLeft: 20, width: 'auto', whiteSpace: 'nowrap' }}></RadioButton>
        )
    }

    return (
        <div style={{ margin: 10, color: '#777' }}>
            <div style={{display: 'flex', alignItems: 'center', fontSize: 14, marginBottom: 20}}>
                <div style={{ flex: '1 1'}}>
                    <FontIcon className="material-icons" style={{ fontSize: 14, marginRight: 5 }}>event_note</FontIcon>
                    Wochen-Konfigurationen
                </div>
                <div style={{ flex: '0 0'}}>
                    <RaisedButton onClick={showWeeklySetsPage}
                                  icon={<FontIcon className="material-icons">create</FontIcon>}
                                  primary={true}
                                  style={{ minWidth: 50 }} />
                </div>
            </div>
            <RadioButtonGroup name="activeSet"
                              valueSelected={weeklyConfig.activeSet}
                              onChange={(e, value) => selectSet(value)}>
                {weeklyConfig.sets.map(renderListItem)}
            </RadioButtonGroup>
        </div>
    )
}
export default withRouter(observer(WeeklySetList))
