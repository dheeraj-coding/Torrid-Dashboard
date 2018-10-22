import React, { Component } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

const styles = (theme) => ({
    grow: {
        flexGrow: 1,
    },

});

class MyAppBar extends Component {
    constructor(props) {
        super(props);
        this.handlClick = this.handlClick.bind(this);
    }
    handlClick(btn) {
        return (event) => {
            this.props.history.push('/' + btn);
        }
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <AppBar position='static'>
                    <Toolbar>
                        <Typography variant='headline' className={classes.grow}>
                            Torrid
                        </Typography>
                        <Button color='inherit' onClick={this.handlClick('login')}>Login</Button>
                        <Button color='inherit' onClick={this.handlClick('register')}>Register</Button>
                    </Toolbar>

                </AppBar>
            </div>
        );
    }
}
export default withRouter(withStyles(styles)(MyAppBar));