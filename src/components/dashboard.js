import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { getPostcode } from './Util';
import fireb from '../fireb';
import Maps from './maps';
import {
    Paper,
    Typography,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    IconButton,
    Dialog,
    AppBar,
    Toolbar,
    Slide,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import {
    Visibility,
} from '@material-ui/icons';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}


const styles = (theme) => ({
    paper: {
        [theme.breakpoints.up('md')]: {
            width: '90vw',
            margin: '2em auto',
        },
        width: '100vw',
        margin: '1em',
        height: '600'
    },
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
});
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: {

            },
            activeUser: {

            },
            open: false,
        };
        this.dbRef = {};
        getPostcode(this.props.latitude, this.props.longitude, (postcode) => {
            console.log(postcode);
            this.dbRef = fireb.database().ref('locations/' + postcode + '/affected');
            this.dbRef.on('value', (snapshot) => {
                this.setState({ users: snapshot.val() });
            });
        })
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }
    handleOpen(user, event) {
        this.setState({ open: true, activeUser: user });
    }
    handleClose(event) {
        this.setState({ open: false });
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Paper className={classes.paper} elevation={3}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Typography variant='title'>Name</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant='title'>Phone Number</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant='title'>View</Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.state.users ?
                                    Object.keys(this.state.users).map((val, index) => (
                                        <TableRow key={val + index}>
                                            <TableCell >
                                                <Typography>{this.state.users[val]['name']}</Typography>
                                            </TableCell>
                                            <TableCell >
                                                <Typography>{this.state.users[val]['phone']}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <IconButton onClick={this.handleOpen.bind(this, this.state.users[val])}>
                                                    <Visibility fontSize='small' />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    )) : undefined
                            }

                        </TableBody>
                    </Table>
                </Paper>
                <Dialog
                    fullScreen
                    open={this.state.open}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                >
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" color="inherit" className={classes.flex}>
                                Location
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    {console.log(this.state.activeUser)}
                    <Maps name={this.state.activeUser['name']}
                        title={this.state.activeUser['name'] + ':' + this.state.activeUser['phone']}
                        position={{ lat: this.state.activeUser['lat'], lng: this.state.activeUser['lon'] }} />
                </Dialog>
            </div>
        );
    }
}

export default (withStyles(styles)(Dashboard));