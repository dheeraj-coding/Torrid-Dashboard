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
            <div style={{ width: '100%', height: '100%' }}>
                <Map google={this.props.google} zoom={8} style={{ width: '100%', height: '100%' }} initialCenter={this.props.position[0]} >
                    {this.props.position.map((val, index) => (
                        <Marker name={this.props.name[index]} title={this.props.title[index]} position={val} key={index} />
                    ))}
                </Map>
            </div>
        );
    }
}
export default GoogleApiWrapper({
    apiKey: mapsKey,
})(MapContainer);