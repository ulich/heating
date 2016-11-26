import React, {PropTypes} from 'react';
import {BackButton} from 'react-onsenui';

const PopPageBackButton = (props, {navigator}) => {

    const goBack = () => {
        navigator.popPage()
    }

    return <BackButton onClick={goBack}>Zurück</BackButton>
}
PopPageBackButton.contextTypes = {
    navigator: PropTypes.object.isRequired
}
export default PopPageBackButton
