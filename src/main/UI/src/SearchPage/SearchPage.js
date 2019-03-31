import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { geocodeByAddress, getLatLng, } from 'react-places-autocomplete';
import './SearchPage.css';
/* global google */

class SearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            lat: 0,
            long: 0
        }
        this.input = React.createRef();
        this.autocomplete = null;
        this.geocoder = new google.maps.Geocoder();
        this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount() {
        this.autocomplete = new google.maps.places.Autocomplete(
          this.input.current,
          { types: ["address"] }
        );
        this.autocomplete.addListener("place_changed", this.handlePlaceChanged);
    }
    
    handlePlaceChanged() {
        const place = this.autocomplete.getPlace();
        this.input = place;
        console.log(place);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    } 

    handleSubmit() {
        if (this.input.formatted_address === '') {
            return;
        }

        /*
        if (!this.input.place_id) {
            return;
        }
        console.log(this.input.geometry.location);
        this.geocoder.geocode({'placeId': this.input.place_id}, function(results, status) {
            console.log(results[0].geometry.location.lat);
            if (status !== 'OK') {
                window.alert('Geocoder failed due to: ' + status);
                return;       
            }
            //console.log(results[0].geometry.location.lat. results[0].geometry.location.long)
            /*
            this.setState({
                lat: results[0].geometry.location.lat, 
                long: results[0].geometry.location.long,
            });
            
        //})
        //*/
        console.log(this.input.formatted_address);
        geocodeByAddress(this.input.formatted_address)
        .then(results => getLatLng(results[0]))
        .then(latLng => { this.setState({lat: latLng.lat, long: latLng.lng}) })//console.log('Success', latLng.lat, latLng.lng))//{ this.storeCoords(latLng) })//
        .catch(error => console.error('Error', error));
        
        setTimeout( () => {
            console.log(this.state.lat);
            console.log(this.state.long);
            this.props.history.push("/map/" + this.state.lat + '/' + this.state.long);
        }, 500);
        //*/
    };

    render() {
        return (
            <div id="parent">
              <h1>Map</h1>
              <div id="inputSpace">
                    <label>
                        Search for Address
                        <input 
                            ref={this.input}
                            value={this.state.address}
                            name="address" 
                            id="autocomplete" 
                            placeholder="Enter Address"
                            onChange={this.handleChange}
                        />
                    </label>
                    {/*<Link to={"/map/" + this.state.lat + "/" + this.state.long}>*/}
                        <button id="submit" onClick={this.handleSubmit}>Search</button>
                    {/*</Link>*/}
              </div>
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
                <Link to="/map/34.0305647--118.47735419999998">Map Page</Link>
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
        this.state = {
            address: '',
            lat: 0,
            long: 0
        }
        this.input = React.createRef();
        this.autocomplete = null;
        this.geocoder = new google.maps.Geocoder();
        this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount() {
        this.autocomplete = new google.maps.places.Autocomplete(
          this.input.current,
          { types: ["address"] }
        );
        this.autocomplete.addListener("place_changed", this.handlePlaceChanged);
    }
    
    handlePlaceChanged() {
        const place = this.autocomplete.getPlace();
        this.input = place;
        console.log(place);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    } 

    handleSubmit() {
        if (this.input.formatted_address === '') {
            return;
        }

        /*
        if (!this.input.place_id) {
            return;
        }
        console.log(this.input.geometry.location);
        this.geocoder.geocode({'placeId': this.input.place_id}, function(results, status) {
            console.log(results[0].geometry.location.lat);
            if (status !== 'OK') {
                window.alert('Geocoder failed due to: ' + status);
                return;       
            }
            //console.log(results[0].geometry.location.lat. results[0].geometry.location.long)
            /*
            this.setState({
                lat: results[0].geometry.location.lat, 
                long: results[0].geometry.location.long,
            });
            
        //})
        //*/
        console.log(this.input.formatted_address);
        geocodeByAddress(this.input.formatted_address)
        .then(results => getLatLng(results[0]))
        .then(latLng => { this.setState({lat: latLng.lat, long: latLng.lng}) })//console.log('Success', latLng.lat, latLng.lng))//{ this.storeCoords(latLng) })//
        .catch(error => console.error('Error', error));
        
        setTimeout( () => {
            console.log(this.state.lat);
            console.log(this.state.long);
            this.props.history.push('/' + this.state.lat + '/' + this.state.long);
        }, 500);
        //*/
    };

    render() {
        return (
            <div id="parent">
              <div id="inputSpace">
                    <label>
                        Search for Address
                        <input 
                            ref={this.input}
                            value={this.state.address}
                            name="address" 
                            id="autocomplete" 
                            placeholder="Enter Address"
                            onChange={this.handleChange}
                        />
                    </label>
                    {/*<Link to={"/map/" + this.state.lat + "/" + this.state.long}>*/}
                        <button id="submit" onClick={this.handleSubmit}>Search</button>
                    {/*</Link>*/}
              </div>
            </div>
            
        );
    }
    //*/
}

withRouter(SearchAddress);
export default SearchPage;