import React from 'react';
import {observer} from 'mobx-react';
import {store} from '../Store';

const HeatingStatus = observer(() => {
    if (!store.loaded) {
        return null
    }

    const style = {
        backgroundColor: store.status.enabled ? '#05ef4b' : '#f40000',
        width: 16,
        height: 16,
        borderRadius: 8,
        position: 'absolute',
        bottom: 20,
        right: 20
    }

    return <div style={style}></div> 
})
export default HeatingStatus
