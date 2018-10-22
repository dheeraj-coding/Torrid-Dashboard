import React, { Component } from 'react';
import {
    Paper,
    Typography,
    TextField,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogContentText,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import fireb from '../fireb';
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
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogContent: '',
            dialogTitle: '',
            dialogOpen: false
        };
        this.handleLogin = this.handleLogin.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
    }
    handleLogin(event) {
        const username = document.getElementById('username').value;
        const pass = document.getElementById('password').value;
        fireb.auth().signInWithEmailAndPassword(username, pass).then((res) => {
            this.props.history.push('/dashboard');
        }).catch((err) => {
            this.setState({ dialogOpen: true, dialogContent: 'Invalid Username or Password', dialogTitle: 'Login Failed' });
        });
    }
    handleDialogClose(event) {
        this.setState({ dialogOpen: false });
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Paper className={classes.paper} elevation={3}>
                    <Typography style={{ textAlign: 'center' }} variant='display3'>
                        Login
                    </Typography>
                    <br />
                    <br />
                    <TextField
                        className={classes.textField}
                        required
                        id='username'
                        label='Email'
                    />
                    <br />
                    <TextField
                        className={classes.textField}
                        required
                        id='password'
                        type='password'
                        label='Password'
                    />
                    <br />
                    <br />
                    <Button variant='contained' color='primary' onClick={this.handleLogin}>
                        Login
                    </Button>
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
            </div>
        );
    }
}
export default withStyles(styles)(Login);