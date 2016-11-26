import React from 'react';
import {Navigator} from 'react-onsenui';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import NavigatorProvider from './utils/NavigatorProvider';
import MainPage from './main-page/MainPage';


const renderPage = (route, navigator) =>
    <NavigatorProvider navigator={navigator} key={route.render}>
        {route.render()}
    </NavigatorProvider>


const App = () =>
    <Navigator renderPage={renderPage}
               initialRoute={{render: () => <MainPage />}} />

export default App
