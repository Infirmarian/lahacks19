import React from 'react';
import { Link } from 'react-router-dom';

class SearchPage extends React.Component {
    render() {
        return (
            <div id="parent">
                <form type = "text">
                    <label>
                        Search for Address
                        <input name="address" placeholder="Enter Address"/>
                    </label>
                </form>
                <Link to="/map" align="center">Map Page</Link>
                <br/>
                <Link to="/stats/123" align="center">Stats Page</Link>
            </div>
        );
    }
}

export default SearchPage;