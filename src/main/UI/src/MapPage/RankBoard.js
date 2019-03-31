import React from 'react';

class RankBoard extends React.Component {
    compareWater(h1, h2) {
        if (h1.day > h2.day) {
            return -1;
        }
        else if (h1.day < h2.day) {
            return 1;
        }
        else {
            return 0;
        }
    }

    render() {
        /*
        const houseData = this.props;
        const 
        */
        return (
            <div id="parent">
                
            </div>
        );
    }
}

export default RankBoard;