import React from 'react';
import { Link } from 'react-router-dom';
import './Globals.css'

class Globals extends React.Component {
    render() {
        return (
            <BackToHome/>
        );
    }
}

class BackToHome extends React.Component {
    render() {
        return (
            <div id="parent" className="Home">
                <Link to='/'><p>Back To Home</p></Link>
            </div>
        );
    }
}

export default Globals;