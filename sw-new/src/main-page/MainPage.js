import React, {Component, PropTypes} from 'react';
import {Toolbar, Page} from 'react-onsenui';
import WeeklySetList from './weekly-set/WeeklySetList';

export default class MainPage extends Component {
    
    static propTypes = {
        navigator: PropTypes.object.isRequired
    }

    constructor() {
        super()

        const weeklySets = [{
            name: "Immer an",
            weekdays: [
                // first is monday, last is sunday. server returns first stunday, last saturday!
                [{start: "00:00", end: "24:00"}, {start: "00:00", end: "24:00"}],
                [{start: "00:00", end: "24:00"}],
                [{start: "00:00", end: "24:00"}], 
                [{start: "00:00", end: "24:00"}], 
                [{start: "00:00", end: "24:00"}], 
                [{start: "00:00", end: "24:00"}], 
                [{start: "00:00", end: "24:00"}]
            ]
        }, {
            name: "Immer aus",
            weekdays: [
                // first is monday, last is sunday. server returns first stunday, last saturday!
                [], [], [], [], [], [], []
            ]
        }]

        this.state = {
            weeklySets,
            activeWeeklySet: weeklySets[0]
        }
    }

    selectWeeklySet(set) {
        this.setState({ activeWeeklySet: set })
    }

    renderToolbar() {
        return (
            <Toolbar>
                <div className="center">Heizung</div>
            </Toolbar>
        )
    }

    render() {
        return (
            <Page renderToolbar={this.renderToolbar.bind(this)}>
                <WeeklySetList weeklySets={this.state.weeklySets}
                               activeSet={this.state.activeWeeklySet}
                               onSelect={this.selectWeeklySet.bind(this)}
                               navigator={this.props.navigator} />
            </Page>
        )
    }
}
