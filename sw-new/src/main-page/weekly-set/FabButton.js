import React from 'react';
import {Fab} from 'react-onsenui';
import ons from 'onsenui';

const FabButton = (props) =>
    <Fab position="bottom right"
         ripple={true}
         style={{backgroundColor: ons.platform.isIOS() ? '#4282cc' : null}}
         {...props}>
        
        {props.children}
    </Fab>

export default FabButton
