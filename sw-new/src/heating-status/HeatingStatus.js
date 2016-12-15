import React from 'react';
import {observer} from 'mobx-react';
import Paper from 'material-ui/Paper';

const HeatingStatus = observer(({status, style}) => {

    const defaultStyle = {
        backgroundColor: status.enabled ? '#05ef4b' : '#f40000',
        width: 16,
        height: 16
    }

    style = Object.assign(defaultStyle, style)

    return <Paper style={style} zDepth={2} circle={true} />
})
export default HeatingStatus
