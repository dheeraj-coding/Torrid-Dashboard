import React, { Component } from 'react';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import { mapsKey } from '../constant';
class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        return (
            <Map google={this.props.google} zoom={8} style={{ width: '100%', height: '100%' }} initialCenter={this.props.position} >
                <Marker name={this.props.name} title={this.props.title} position={this.props.position} />
            </Map>
        );
    }
}
export default GoogleApiWrapper({
    apiKey: mapsKey,
})(MapContainer);