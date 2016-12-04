import React from 'react';
import {observer} from 'mobx-react';
import Paper from 'material-ui/Paper';
import {store} from '../Store';

const HeatingStatus = observer(() => {
    if (!store.loaded) {
        return null
    }

    const style = {
        backgroundColor: store.status.enabled ? '#05ef4b' : '#f40000',
        width: 16,
        height: 16,
        margin: 15
    }

    return <Paper style={style} zDepth={2} circle={true} />
})
export default HeatingStatus
