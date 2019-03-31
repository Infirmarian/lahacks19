import React from 'react';
import { Link } from 'react-router-dom';
import { geocodeByAddress, getLatLng, } from 'react-places-autocomplete';
import './SearchPage.css';
/* global google */

class SearchPage extends React.Component {
    render() {
        return (
            <div id="parent">
              <h1>Map</h1>
              <SearchAddress/>
              {/*<div id="inputSpace">
                <form type = "text">
                    <label>
                        Search for Address
                        <input 
                            name="address" 
                            id="autocomplete" 
                            onFocus="geolocate()"
                            placeholder="Enter Address"
                        />
                    </label>
                    <Link to="/map/123"><button id="submit">Search</button></Link>
                </form>              
              </div>*/}
              <h1>LeaderBoards</h1>
              <div id="inputSpace">
                <form type="text">
                    <label>
                        Search for Zipcode
                        <input name="zipcode" placeholder="Enter Zipcode"/>
                        <Link to="/leaderboards/123"><button id="submit">Search</button></Link>
                    </label>
                </form>
              </div>
              <div id="test" align="center">
                <Link to="/map/123">Map Page</Link>
                <br/>
                <Link to="/leaderboards/123">Leaderboards Page</Link>
                <br/>
                <Link to="/stats/123">Stats Page</Link>
              </div>
            </div>
        );
    }
}

class SearchAddress extends React.Component {
    constructor(props) {
        super(props);
        this.address = React.createRef();
        this.autocomplete = null;
        this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
    }
    
    componentDidMount() {
        this.autocomplete = new google.maps.places.Autocomplete(
          this.address.current,
          { types: ["address"] }
        );
        this.autocomplete.addListener("place_changed", this.handlePlaceChanged);
    }
    
    handlePlaceChanged() {
        const place = this.autocomplete.getPlace();
        this.address = place;
    }

    handleSubmit = address => {
        geocodeByAddress(address)
        .then(results => getLatLng(results[0]))
        .then(latLng => console.log('Success', latLng))
        .catch(error => console.error('Error', error));
    };

    render() {
        return (
            <div id="parent">
              <div id="inputSpace">
              <form type="text">
                    <label>
                        Search for Address
                        <input 
                            ref={this.address}
                            name="address" 
                            id="autocomplete" 
                            placeholder="Enter Address"
                        />
                    </label>
                    <Link to="/map/123"><button id="submit" onClick={this.handleSubmit}>Search</button></Link>
                </form>
              </div>
            </div>
            
        );
    }
    //*/
}

export default SearchPage;