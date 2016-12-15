import React from 'react';
import FontIcon from 'material-ui/FontIcon';

export default function Icon ({name, style}) {
    return <FontIcon className="material-icons" style={style}>{name}</FontIcon>
}
