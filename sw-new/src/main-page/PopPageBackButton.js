import React, {Component, PropTypes} from 'react';
import {BackButton} from 'react-onsenui';

export default class PopPageBackButton extends Component {
    
    static propTypes = {
        navigator: PropTypes.object.isRequired,
    };

    goBack() {
        this.props.navigator.popPage()
    }

    render() {
        return <BackButton onClick={this.goBack.bind(this)}>Zurück</BackButton>
    }
}
