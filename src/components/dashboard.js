import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import {
    Paper,
} from '@material-ui/core'
const styles = (theme) => ({
    paper: {
        [theme.breakpoints.up('md')]: {
            width: '90vw',
            margin: '2em auto',
        },
        width: '100vw',
        margin: '1em',
        height: '600'
    }
});
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Paper className={classes.paper} elevation={3}>

                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(Dashboard);