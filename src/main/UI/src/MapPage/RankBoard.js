import React from 'react';

class RankBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        fakeData: [
          {"latitude": 34.0522,
          "longitude": -118.420,
           "day": 15,
          "week":100,
          "month":500},
    
          {"latitude": 34.0523,
          "longitude": -118.4205,
           "day": 20,
          "week":105,
          "month":600},
    
          {"latitude": 34.0526,
          "longitude": -118.419,
           "day": 10,
          "week":101,
          "month":570}
        ],
        isOpen: {}
      };
      this.onToggleOpen = (id) => {
        this.setState({
          isOpen: {...this.state.isOpen, [id]: !this.state.isOpen[id]}
        });
      }
      this.latitude = 34.0522;
      this.longitude = -118.420;
    }
    
    compareWater(h1, h2) {
        if (h1.day > h2.day) {
            return 1;
        }
        else if (h1.day < h2.day) {
            return -1;
        }
        else {
            return 0;
        }
    }

    findMatchingAddress(houses) {
        for (var i = 0; i < houses.length; i++) {
            if (houses[i].latitude === this.latitude && houses[i].longitude === this.longitude) {
                return i;
            }
        }
        return -1;
    }

    closeRanks(houses) {
        var result = [];
        let matchInd = this.findMatchingAddress(houses);
        if (matchInd < 0) {
            return false;
        }
        var start = 0;
        if (matchInd - 2 > 0) {
            start = matchInd - 2;
        }
        var end = houses.length - 1;
        if (matchInd + 2 < houses.length) {
            end = matchInd + 2;
        }
        console.log(start, end);
        for (var i = start; i <= end; i++) {
            result.push(houses[i].latitude + '/' + houses[i].longitude);
        }
        return result;
    }

    render() {
        const houseData = this.state.fakeData;
        const rankedHouses = houseData.sort(this.compareWater);
        console.log(rankedHouses);
        const displayHouses = this.closeRanks(rankedHouses);
        console.log(displayHouses);
        const display = displayHouses.map(item => <li {...item}/>);
        console.log(display);
        return (
            <div id="parent">
               {display}
            </div>
        );
    }
}

export default RankBoard;