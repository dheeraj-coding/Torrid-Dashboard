import React, { Component } from 'react';
import {
    Paper,
    Typography,
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { geolocated } from 'react-geolocated';
import { withRouter } from 'react-router-dom';
import fireb from '../fireb';
import axios from 'axios';

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
            errorText: '',
            errorState: false,
            dialogContent: '',
            dialogTitle: '',
            dialogOpen: false
        };
        this.handleRegister = this.handleRegister.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
    }
    handleRegister(event) {
        const username = document.getElementById('username').value;
        const pass = document.getElementById('password').value;
        const repeat = document.getElementById('repeatpassword').value;
        if (pass === repeat && this.props.isGeolocationEnabled) {
            this.setState({ username: username, password: pass, errorState: false, errorText: '' });
            fireb.auth().createUserWithEmailAndPassword(username, pass).then((res) => {
                axios({
                    method: 'POST',
                    url: 'http://localhost:8080/hospitals',
                    data: {
                        name: username,
                        password: pass,
                        repeat: repeat,
                        lat: this.props.coords.latitude,
                        lon: this.props.coords.longitude,
                    }
                }).then((res) => {
                    this.props.history.push('/login');
                }, (err) => {
                    this.setState({ dialogOpen: true, dialogContent: 'Sorry! Our servers are facing issues please try again in sometime.', dialogTitle: 'Registration Failed' });
                });
            }).catch((err) => {
                this.setState({ dialogOpen: true, dialogContent: 'Sorry! Our servers are facing issues please try again in sometime.', dialogTitle: 'Registration Failed' });
            });

        } else {
            if (!this.props.isGeolocationEnabled) {
                this.setState({ errorText: 'Geolocation must be enabled', errorState: true });
            } else {
                this.setState({ errorText: 'Passwords don\'t match', errorState: true });
            }
        }
    }
    handleDialogClose(event) {
        this.setState({ dialogOpen: false });
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
                        label='Email'
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
                    <Button variant='contained' color='primary' onClick={this.handleRegister}>
                        Register
                    </Button>
                    <br />
                    <br />
                    <Typography variant='body2' color='error'>
                        {this.state.errorText}
                    </Typography>
                </Paper>
                <Dialog open={this.state.dialogOpen}
                    onClose={this.handleDialogClose}
                >
                    <DialogTitle>{this.state.dialogTitle}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {this.state.dialogContent}
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </div >
        );
    }
}
export default withRouter(geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 1,
})(withStyles(styles)(Register)));