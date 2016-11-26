import {Component, PropTypes} from 'react';

export default class NavigatorProvider extends Component {

    static childContextTypes = {
        navigator: PropTypes.object.isRequired
    }

    static propTypes = {
        navigator: PropTypes.object.isRequired
    }

    getChildContext() {
        return {navigator: this.props.navigator}
    }

    render() {
        return this.props.children
    }
}
