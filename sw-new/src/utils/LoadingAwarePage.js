import React from 'react';
import {observer} from 'mobx-react';
import {Page, ProgressBar} from 'react-onsenui';
import {store} from '../Store';

const LoadingAwarePage = observer((props) =>

    <Page {...props}>
        {<ProgressBar indeterminate={store.loading} value={store.loading ? null : 100} />}
        {props.children}
    </Page>
)
export default LoadingAwarePage
