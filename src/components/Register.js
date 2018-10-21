import React, { Component } from 'react';
import {
    Paper, Typography, TextField, Button,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { geolocated } from 'react-geolocated';
const styles = (theme) => ({
    paper: {
        [theme.breakpoints.up('md')]: {
            width: '20vw',
            height: '60vh',
            margin: '2em auto',
        },
        height: '60vh',
        margin: '2em',
        padding: '1em',
        boxSizing: 'border-box',
        textAlign: 'center',
    },
    textField: {
        width: '80%',
        margin: '1em auto',
    }
});
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errorText: 'Enable Geolocation.',
            errorState: false,
        };
        this.handleRegister = this.handleRegister.bind(this);
    }
    handleRegister(event) {
        const username = document.getElementById('username').value;
        const pass = document.getElementById('password').value;
        const repeat = document.getElementById('repeatpassword').value;
        if (pass === repeat) {
            this.setState({ username: username, password: pass, errorState: false });
        } else {
            this.setState({ errorText: 'Passwords don\'t match', errorState: true });
        }
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Paper className={classes.paper} elevation={3}>
                    <Typography variant='display3'>
                        Register
                    </Typography>
                    <br />
                    <TextField
                        required
                        className={classes.textField}
                        id='username'
                        label='Username'
                    />
                    <TextField
                        required
                        className={classes.textField}
                        id='password'
                        label='Password'
                        type='password'
                    />
                    <TextField
                        required
                        className={classes.textField}
                        id='repeatpassword'
                        label='Re-type Password'
                        type='password'
                    />
                    <br />
                    <br />
                    <Button variant='contained' color='primary' disabled={!this.props.isGeolocationEnabled} onClick={this.handleRegister}>
                        Register
                    </Button>
                    <br />
                    <br />
                    <Typography style={{ display: this.state.errorState ? 'initial' : 'none' }} variant='body2' color='error'>
                        {this.state.errorText}
                    </Typography>
                </Paper>
            </div >
        );
    }
}
export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 10000,
})(withStyles(styles)(Register));