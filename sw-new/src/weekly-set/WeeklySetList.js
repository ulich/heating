import React from 'react';
import {withRouter} from 'react-router';
import {observer} from 'mobx-react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Icon from '../utils/Icon';
import {store} from '../Store';
import WeeklySetName from './WeeklySetName';

function WeeklySetList({weeklyConfig, router}) {

    store.autoSave = true

    const selectSet = (i) => {
        weeklyConfig.activeSet = i
    }

    const showWeeklySetPage = (index) => {
        router.push(`/sets/${index}`)
    }

    return (
        <div style={{ margin: 10, color: '#777' }}>
            <div style={{display: 'flex', alignItems: 'center', fontSize: 14, marginBottom: 20}}>
                <div style={{ flex: '1 1'}}>
                    <Icon name="event_note" style={{ fontSize: 14, marginRight: 5 }} />
                    Wochen-Konfigurationen
                </div>
            </div>
            
            <div style={{display: 'flex'}}>
                <RadioButtonGroup name="activeSet"
                                  valueSelected={weeklyConfig.activeSet}
                                  onChange={(e, value) => selectSet(value)}
                                  style={{flex: '1 1'}}>
                    {weeklyConfig.sets.map((set, i) =>
                        <RadioButton key={i}
                                     value={i}
                                     label={<WeeklySetName name={set.name} />}
                                     style={{ marginBottom: 30, paddingLeft: 20, width: 'auto', whiteSpace: 'nowrap' }}>
                        </RadioButton>
                    )}
                </RadioButtonGroup>

                <div>
                    {weeklyConfig.sets.map((set, i) => 
                        <Icon key={i} name="create"
                              style={{ display: 'block', margin: '0 10px 30px 0' }}
                              onClick={() => showWeeklySetPage(i)}/>
                    )}
                </div>
            </div>

        </div>
    )
}
export default withRouter(observer(WeeklySetList))
