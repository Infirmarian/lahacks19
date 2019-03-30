import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SearchPage from './SearchPage/SearchPage';
import MapPage from './MapPage/MapPage';
import StatsPage from './StatsPage/StatsPage';


class Routes extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={SearchPage}/>
                <Route path='/map/{id}' component={MapPage}/>
                <Route path='/stats/{id}' component={StatsPage}/>
            </Switch>
        );
    }
}

export default Routes;
