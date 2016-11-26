import React, {Component, PropTypes} from 'react';
import {Toolbar, Page, List, ListItem, Input, Button, Icon} from 'react-onsenui';
import PopPageBackButton from '../PopPageBackButton';
import FabButton from './FabButton';
import "./WeekdayPage.css";

export default class WeekdayPage extends Component {
    
    static propTypes = {
        navigator: PropTypes.object.isRequired,
    };

    removeHeatingTime(heatingTime) {
        
    }

    addHeatingTime() {
    }

    renderToolbar() {
        return (
            <Toolbar>
                <div className="left"><PopPageBackButton navigator={this.props.navigator} /></div>
                <div className="center">{this.props.weekDayName}</div>
            </Toolbar>
        )
    }

    renderListItem(heatingTime, i) {
        return (
            <ListItem key={i} modifier="longdivider">
                <div className="center" style={{ display: 'flex' }}>
                    <div style={{ width: 50 }}>
                        <Input value={heatingTime.start} modifier="underbar" />
                    </div>
                    <div style={{ margin: '0 10px' }}>-</div>
                    <div style={{ width: 50 }}>
                        <Input value={heatingTime.end} modifier="underbar" />
                    </div>
                </div>
                <div className="right">
                    <Button modifier="quiet" onClick={this.removeHeatingTime.bind(this, heatingTime)}>
                        <Icon icon="md-delete" className="delete-button"/>
                    </Button>
                </div>
            </ListItem>
        )
    }

    render() {
        return (
            <Page renderToolbar={this.renderToolbar.bind(this)} className="WeekdayPage">
                <List dataSource={this.props.heatingTimes}
                      renderRow={this.renderListItem.bind(this)} />

                <FabButton onClick={this.addHeatingTime.bind(this)}>
                    <Icon icon="md-plus" />
                </FabButton>
            </Page>
        )
    }
}
