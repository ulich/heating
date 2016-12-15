import React from 'react';
import {withRouter} from 'react-router';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import LoadingAwareAppBar from './utils/LoadingAwareAppBar';
import {backend} from './Backend';
import {store} from './Store';


export default withRouter(class LoginPage extends React.Component {

    constructor() {
        super()
        this.state = {
            passwordInvalid: false
        }
    }

    login() {
        backend.setPassword(this.password)
        store.load().then(() => {
            this.props.router.push('/')
        }).catch((error) => {
            this.setState({ passwordInvalid: true })
        })
    }

    render() {
        return (
            <div>
                <LoadingAwareAppBar title="Login" />
                <div style={{ margin: 'auto', textAlign: 'center', width: 200, marginTop: 50 }}>
                    <TextField type="password"
                               floatingLabelText="Passwort"
                               onChange={(e) => this.password = e.target.value}
                               errorText={this.state.passwordInvalid ? 'Falsches Passwort' : null}
                               fullWidth={true} />
                    <RaisedButton label="Login" onClick={this.login.bind(this)} primary={true} style={{ marginTop: 50 }} />
                </div>
            </div>
        )
    }
})
