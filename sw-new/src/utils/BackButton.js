import React from 'react';
import {hashHistory} from 'react-router';
import IconButton from 'material-ui/IconButton';

function BackButton({route}) {
    return (
        <IconButton iconClassName="material-icons"
                    onClick={() => hashHistory.push(route)}
                    iconStyle={{ color: 'white' }}>
            arrow_back
        </IconButton>
    )
}
export default BackButton
