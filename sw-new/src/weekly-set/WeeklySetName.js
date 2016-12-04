import React from 'react';

function WeeklySetName({name}) {
    if (name) {
        return <span>{name}</span>
    } else {
        return <span style={{ fontStyle: 'italic' }}>Ohne Name</span>
    }
}
export default WeeklySetName
