import React from 'react';
import {withRouter} from 'react-router';
import {observer} from 'mobx-react';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import {store} from '../Store';
import HeatingStatus from '../heating-status/HeatingStatus';

function SpecialTimes({specialTimes, router}) {

    store.autoSave = true

    const showSpecialTimesPage = () => {
        router.push('/specials')
    }

    const renderListItem = (special, index) => {
        return (
            <div key={index}>
                {(index === 0) ? null : <Divider />}
                <ListItem rightIcon={<FontIcon className="material-icons">create</FontIcon>}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ flex: '0 0', marginRight: 20 }}>
                            <HeatingStatus enabled={special.enabled} />
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

    return pad(d.getUTCDate()) + '.'
        + pad(d.getUTCMonth()+1) + '.'
        + d.getUTCFullYear() + ' '
        + pad(d.getUTCHours()) + ':'
        + pad(d.getUTCMinutes()) + ' Uhr'
}

function pad(n) {
    return (n < 10) ? ('0'+n) : n
}

const FromTo = ({ label, children }) => 
    <div>
        <span style={{ width: 40, display: 'inline-block' }}>{label}:</span>
        {children}
    </div>
