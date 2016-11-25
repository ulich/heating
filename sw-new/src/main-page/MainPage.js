import React, {Component, PropTypes} from 'react';
import {Toolbar, Page} from 'react-onsenui';
import WeeklySetList from './weekly-set/WeeklySetList';

export default class MainPage extends Component {
    
    static propTypes = {
        navigator: PropTypes.object.isRequired
    }

    constructor() {
        super()

        const weeklySets = [{name: "Immer an"}, {name: "Immer aus"}]

        this.state = {
            weeklySets,
            activeWeeklySet: weeklySets[0]
        }
    }

    renderToolbar() {
        return (
            <Toolbar>
                <div className="center">Heizung</div>
            </Toolbar>
        )
    }

    selectWeeklySet(set) {
        this.setState({ activeWeeklySet: set })
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
