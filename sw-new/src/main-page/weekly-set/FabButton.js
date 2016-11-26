import React, {Component} from 'react';
import {Fab} from 'react-onsenui';
import ons from 'onsenui';

export default class FabButton extends Component {
    
    render() {
        return (
            <Fab position="bottom right"
                 ripple={true}
                 style={{backgroundColor: ons.platform.isIOS() ? '#4282cc' : null}}
                 {...this.props}>
                
                {this.props.children}
            </Fab>
        );
    }
}
