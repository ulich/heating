import React from 'react';
import {hashHistory} from 'react-router';
import IconButton from 'material-ui/IconButton';

function BackButton({confirm, route}) {

    const onClick = () => {
        if (!confirm || confirm()) {
            hashHistory.push(route)
        }
    }

    return (
        <IconButton iconClassName="material-icons"
                    onClick={onClick}
                    iconStyle={{ color: 'white' }}>
            arrow_back
        </IconButton>
    )
}
export default BackButton
