import React from 'react';
import { Link } from 'react-router-dom';
import MapContainer from './MapContainer';

class MapPage extends React.Component {
    render() {
        return (
            <div id="parent">
                <MapContainer/>
            </div>
        );
    }
}

export default MapPage;