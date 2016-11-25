import React, { Component } from 'react';
import {Navigator} from 'react-onsenui';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import MainPage from './main-page/MainPage';

class App extends Component {

    renderPage(route, navigator) {
        return <route.component key={route.component} navigator={navigator} {...route.props} />
    }

    render() {
        return (
            <Navigator renderPage={this.renderPage}
                       initialRoute={{component: MainPage}} />
        )
    }
}

export default App;
