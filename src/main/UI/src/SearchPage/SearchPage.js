import React from 'react';
import { Link } from 'react-router-dom';
import './SearchPage.css';

class SearchPage extends React.Component {
    render() {
        return (
            <div id="parent">
              <div id="inputSpace">
                <form type = "text">
                    <label>
                        Search for Address
                        <input name="address" placeholder="Enter Address"/>
                    </label>
                    <Link to="/map/123"><button id="submit">Search</button></Link>
                </form>              
              </div>
              <h1>LeaderBoards</h1>
              <div id="inputSpace">
                <form type="text">
                    <label>
                        Search for Zipcode
                        <input name="zipcode" placeholder="Enter Zipcode"/>
                        <Link to="/leaderboards"><button id="submit">Search</button></Link>
                    </label>
                </form>
              </div>
              <div id="test" align="center">
                <Link to="/map/123">Map Page</Link>
                <br/>
                <Link to="/stats/123">Stats Page</Link>
              </div>
            </div>
        );
    }
}

export default SearchPage;