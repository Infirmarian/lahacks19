import React from 'react';
import { Link } from 'react-router-dom';

class SearchPage extends React.Component {
    render() {
        return (
            <div id="parent">
            <Link to="/map/123">Map Page</Link>
            <br/>
            <Link to="/stats/123">Stats Page</Link>
            </div>
        );
    }
}

export default SearchPage;