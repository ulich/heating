import React, {Component, PropTypes} from 'react';
import {Toolbar, Page, BackButton} from 'react-onsenui';

export default class WeeklySetPage extends Component {
    
    static propTypes = {
        navigator: PropTypes.object.isRequired,
        weeklySet: PropTypes.object.isRequired,
    }

    renderToolbar() {
        const backButton = <BackButton onClick={this.goBack.bind(this)}>Zurück</BackButton>

        return (
            <Toolbar>
                <div className='left'>{backButton}</div>
                <div className="center">{this.props.weeklySet.name}</div>
            </Toolbar>
        )
    }

    goBack() {
        this.props.navigator.popPage()
    }

    render() {
        return (
            <Page renderToolbar={this.renderToolbar.bind(this)}>

            </Page>
        )
    }
}
