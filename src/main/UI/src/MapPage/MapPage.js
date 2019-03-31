import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import MapContainer from './MapContainer';
import PropTypes from 'prop-types';

class MapPage extends React.Component {
    parseLat(path) {
        var result = '';
        for (var i = 5; i < path.length; i++) {
            if (path[i] === '/') {
                break;
            }
            result += path[i];
        }
        return result;
    }

    parseLng(path) {
        return path.substr(path.indexOf("/", 5) + 1);
    }

    render() {
        const url = this.props.history.location;
        const myLat = this.parseLat(url.pathname);
        const myLng = this.parseLng(url.pathname);
        console.log({myLat});
        console.log({myLng});
        return (
            <MapContainer/>
        );
    }
}

withRouter(MapPage);
export default MapPage;