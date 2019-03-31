import React, { Component } from 'react';
import {GoogleMap, withGoogleMap, Marker} from 'react-google-maps';
 
class MapContainer extends Component {

  state = {
    fakeData: [
      {"latitude": 34.0522,
      "longitude": -118.420,
       "day": 25,
      "week":100,
      "month":500},

      {"latitude": 34.0523,
      "longitude": -118.4205,
       "day": 20,
      "week":105,
      "month":600},

      {"latitude": 34.0526,
      "longitude": -118.420,
       "day": 21,
      "week":101,
      "month":570}]
  }

  render() {
    var houseCoordinates = [];
    var givenCoordinates = this.state.fakeData.map((house, index) => {
      houseCoordinates[index] = {lats: house.latitude, longs: house.longitude};
      return houseCoordinates[index];
    })
    
    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        defaultCenter = { { lat: 34.0522, lng: -118.420 } }
        defaultZoom = { 18 }
        defaultOptions={{
          disableDefaultUI: false, // disable default map UI
          draggable: true, // make map draggable
          keyboardShortcuts: false, // disable keyboard shortcuts
          scaleControl: false, // allow scale controle
          scrollwheel: false,
          zoomControl: false,
        }}
        
      >
         {houseCoordinates.map((home) => {
            return <Marker position={{lat: home.lats, lng: home.longs}}/>;
            })
          }
          />
      </GoogleMap>
   ));

    return (
    <div>
        <GoogleMapExample
          containerElement={ <div style={{ height: `500px`, width: '500px' }} /> }
          mapElement={ <div style={{ height: `100%` }} /> }
        >

            

        </GoogleMapExample>

      </div>
    );
  }
};
 
export default MapContainer

