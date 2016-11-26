import React, {Component, PropTypes} from 'react';
import {Toolbar, Page, List, ListItem} from 'react-onsenui';
import PopPageBackButton from '../PopPageBackButton';
import WeekdayPage from './WeekdayPage';


export default class WeeklySetPage extends Component {
    
    static propTypes = {
        navigator: PropTypes.object.isRequired,
        weeklySet: PropTypes.object.isRequired,
    }

    static weekDayNames = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag']

    showWeekdayPage(weekDayName, heatingTimes) {
        this.props.navigator.pushPage({
            component: WeekdayPage,
            props: { weekDayName, heatingTimes }
        })
    }

    renderToolbar() {
        return (
            <Toolbar>
                <div className='left'><PopPageBackButton navigator={this.props.navigator} /></div>
                <div className="center">{this.props.weeklySet.name}</div>
            </Toolbar>
        )
    }

    renderListItem(heatingTimes, weekDayIndex) {
        const weekDayName = WeeklySetPage.weekDayNames[weekDayIndex] || '?'
        const heatingTimesText = heatingTimes.map(t => `${t.start} - ${t.end}` ).join(', ')

        return (
            <ListItem key={weekDayIndex} tappable onClick={this.showWeekdayPage.bind(this, weekDayName, heatingTimes)}>
                <div className="left" style={{ width: 100 }}>
                    {weekDayName}
                </div>
                <div className="center" style={{ fontSize: 10 }}>
                    {heatingTimesText}
                </div>
            </ListItem>
        )
    }

    render() {
        return (
            <Page renderToolbar={this.renderToolbar.bind(this)}>
                <List dataSource={this.props.weeklySet.weekdays}
                      renderRow={this.renderListItem.bind(this)} />
            </Page>
        )
    }
}
