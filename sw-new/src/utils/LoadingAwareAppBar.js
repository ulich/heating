import React from 'react';
import {observer} from 'mobx-react';
import AppBar from 'material-ui/AppBar';
import LinearProgress from 'material-ui/LinearProgress';
import {store} from '../Store';

function LoadingAwareAppBar(props) {
    return (
        <div>
            <AppBar iconElementLeft={<div/>} {...props} />
            <LinearProgress mode={store.loading ? 'indeterminate' : 'determinate'} value={100} />
        </div>
    )
}

export default observer(LoadingAwareAppBar)
