import React from 'react';
import {Input} from 'react-onsenui';
import {HOC} from 'formsy-react';

const FormsyInput = HOC((props) => {

    const style = props.isValid() ? {} : {borderBottom: '3px solid #B83E2C'}

    return (
        <Input {...props} value={props.getValue()} onChange={(e) => props.setValue(e.target.value)} style={style}/>
    )
})
export default FormsyInput
