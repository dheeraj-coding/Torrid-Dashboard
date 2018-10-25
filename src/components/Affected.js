import React, { Component } from 'react';
import { geolocated } from 'react-geolocated';
import { withStyles } from '@material-ui/core/styles';
import { getPostcode } from './Util';
import fireb from '../fireb';
import {
    Paper
} from '@material-ui/core';
import Maps from './maps';

const styles = (theme) => ({
    paper: {
        width: '80%',
        height:'80%',
        margin: '1em',
    },
});

class Affected extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: {},
        };
        this.dbRef = {};
    }
    render() {
        if (this.props.coords) {
            getPostcode(this.props.coords.latitude, this.props.coords.longitude, (postcode) => {
                this.dbRef = fireb.database().ref('locations/');
                this.dbRef.on('value', (snapshot) => {

                    this.setState(() => {
                        return { locations: snapshot.val() };
                    });
                });
            });
        }
        const { classes } = this.props;
        return (
            <div>
                <Paper className={classes.paper} elevation={3}>
                    {
                        Object.keys(this.state.locations).length ? (<Maps
                            name={Object.keys(this.state.locations).map((val) => {
                                return this.state.locations[val]['display_name']
                            })}
                            title={Object.keys(this.state.locations).map((val) => {
                                return this.state.locations[val]['display_name']
                            })}
                            position={Object.keys(this.state.locations).map((val) => {
                                return { 'lat': this.state.locations[val]['lat'], 'lng': this.state.locations[val]['lon'] }
                            })}
                        />) : undefined
                    }

                </Paper>
            </div>

        );
    }
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 1,
})(withStyles(styles)(Affected));