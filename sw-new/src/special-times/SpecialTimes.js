import React from 'react';
import {withRouter} from 'react-router';
import {observer} from 'mobx-react';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import {store} from '../Store';
import HeatingStatus from '../heating-status/HeatingStatus';
import {padTo2} from '../utils/StringUtils';

function SpecialTimes({specialTimes, router}) {

    store.autoSave = true

    const showSpecialTimesPage = (index) => {
        router.push(`/specials/${index}`)
    }

    const renderListItem = (special, index) => {
        return (
            <div key={index}>
                {(index === 0) ? null : <Divider />}
                <ListItem onClick={() => showSpecialTimesPage(index)}
                          rightIcon={<FontIcon className="material-icons">create</FontIcon>}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ flex: '0 0', marginRight: 20 }}>
                            <HeatingStatus status={special} />
                        </div>
                        <div style={{ flex: '1 1' }}>
                            <FromTo label="Von">{formatDate(special.start)}</FromTo>
                            <FromTo label="Bis">{formatDate(special.stop)}</FromTo>
                        </div>
                    </div>
                </ListItem>
            </div>
        )
    }

    return (
        <div style={{ color: '#777', marginTop: 50 }}>
            <div style={{ margin: '10px 10px 0 10px', fontSize: 14}}>
                <FontIcon className="material-icons" style={{ fontSize: 14, marginRight: 5 }}>beach_access</FontIcon>
                Spezielle Heizzeiten
            </div>
            <List>
                {specialTimes.map(renderListItem)}
            </List>
        </div>
    )
}
export default withRouter(observer(SpecialTimes))


function formatDate(timestamp) {
    const d = new Date(timestamp)

    return padTo2(d.getDate()) + '.'
        + padTo2(d.getMonth()+1) + '.'
        + d.getFullYear() + ' '
        + padTo2(d.getHours()) + ':'
        + padTo2(d.getMinutes()) + ' Uhr'
}

const FromTo = ({ label, children }) => 
    <div>
        <span style={{ width: 40, display: 'inline-block' }}>{label}:</span>
        {children}
    </div>
