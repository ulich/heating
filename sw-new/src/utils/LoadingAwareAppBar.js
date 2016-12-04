import React from 'react';
import {observer} from 'mobx-react';
import AppBar from 'material-ui/AppBar';
import LinearProgress from 'material-ui/LinearProgress';
import {store} from '../Store';

const LoadingAwareAppBar = observer((props) =>
    <div>
        <AppBar {...props} iconElementLeft={<div/>} />
        <LinearProgress mode={store.loading ? 'indeterminate' : 'determinate'} value={100} />
    </div>
)

export default LoadingAwareAppBar
