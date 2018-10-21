import React, { Component } from 'react';
import {
    Paper,
    Typography,
    TextField,
    Button,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
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
                        label='Username'
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
                    <Button variant='contained' color='primary'>
                        Login
                    </Button>
                </Paper>
            </div>
        );
    }
}
export default withStyles(styles)(Login);