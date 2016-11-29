import React from 'react';
import {observer} from 'mobx-react';
import {ListItem, Button, Icon} from 'react-onsenui';
import Formsy from 'formsy-react';
import FormsyInput from '../../utils/FormsyInput';
import "./HeatingTime.css";

export default observer(class HeatingTime extends React.Component {

    render() {
        return (
            <ListItem modifier="longdivider" className="HeatingTime">

                <Formsy.Form className="center"
                             style={{ display: 'flex' }}
                             ref={(e) => {this.form = e}}
                             onValid={() => {this.form.valid = true}}
                             onInvalid={() => { this.form.valid = false}}>

                    <div style={{ width: 50 }}>
                        <HeatingTimeInput name="start" value={this.props.time.start} />
                    </div>
                    <div style={{ margin: '0 10px' }}>-</div>
                    <div style={{ width: 50 }}>
                        <HeatingTimeInput name="stop" value={this.props.time.stop} />
                    </div>
                </Formsy.Form>

                <div className="right">
                    <Button modifier="quiet" onClick={() => this.props.onDelete(this.props.time)}>
                        <Icon icon="md-delete" className="delete-button"/>
                    </Button>
                </div>
            </ListItem>
        )
    }
})

const HeatingTimeInput = (props) =>
    <FormsyInput {...props}
                 required
                 validations={{ matchRegexp: /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/ }}
                 modifier="underbar" />
