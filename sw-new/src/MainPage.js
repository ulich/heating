import React from 'react';
import {observer} from 'mobx-react';
import {Toolbar, Page, ProgressBar} from 'react-onsenui';
import WeeklySetList from './weekly-set/weekly-set-list/WeeklySetList';
import {store} from './Store';


export default observer(class MainPage extends React.Component {

    componentDidMount() {
        store.load()
    }

    renderToolbar() {
        return (
            <Toolbar>
                <div className="center">Heizung</div>
            </Toolbar>
        )
    }

    content() {
        if (store.loading) {
            return <ProgressBar indeterminate />
        } else if (store.error) {
            return <div><p>Es ist ein Fehler aufgetreten:</p><p>{store.error.message}</p></div>
        } else {
            return <WeeklySetList weeklyConfig={store.config.weekly} />
        }
    }

    render() {
        return (
            <Page renderToolbar={this.renderToolbar.bind(this)}>
                {this.content()}
            </Page>
        )
    }

})
