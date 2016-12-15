import React from 'react';
import FontIcon from 'material-ui/FontIcon';

export default function Icon (props) {
    return <FontIcon className="material-icons" {...props}>{props.name}</FontIcon>
}
