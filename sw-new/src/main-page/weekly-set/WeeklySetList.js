import React, {Component, PropTypes} from 'react';
import {List, ListItem, ListHeader, Input, Button, Icon} from 'react-onsenui';
import WeeklySetPage from './WeeklySetPage';

export default class WeeklySetList extends Component {
    
    static propTypes = {
        weeklySets: PropTypes.array.isRequired,
        activeSet: PropTypes.object,
        onSelect: PropTypes.func.isRequired,
        navigator: PropTypes.object.isRequired,
    };

    renderListItem(set) {
        const id = 'weekly-' + btoa(set.name)
        return (
            <ListItem key={set.name} tappable>
                <label className="left">
                    <Input type="radio"
                           inputId={id}
                           checked={set === this.props.activeSet}
                           onChange={() => this.props.onSelect(set)} />
                </label>
                <label className="center" htmlFor={id}>
                    {set.name}
                </label>
                <div className="right">
                    <Button modifier="quiet" onClick={this.showWeeklySetPage.bind(this, set)}>
                        <Icon icon="md-edit" />
                    </Button>
                </div>
            </ListItem>
        )
    }

    showWeeklySetPage(set) {
        this.props.navigator.pushPage({ component: WeeklySetPage, props: { weeklySet: set } })
    }

    render() {
        return (
            <List dataSource={this.props.weeklySets}
                  renderHeader={() => <ListHeader>Heiz-Konfiguration</ListHeader>}
                  renderRow={this.renderListItem.bind(this)} />
        );
    }
}
