import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SearchPage from './SearchPage/SearchPage';
import MapPage from './MapPage/MapPage';
import StatsPage from './StatsPage/StatsPage';
import LeaderboardPage from './LeaderboardPage/LeaderboardPage';


class Routes extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={SearchPage}/>
                <Route path='/map/:lat/:lng' component={MapPage}/>
                <Route path='/stats/:id' component={StatsPage}/>
                <Route path='/leaderboards/:id' component={LeaderboardPage}/>
            </Switch>
        );
    }
}

export default Routes;
