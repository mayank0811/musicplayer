import React , { Component } from 'react';
import Musicplayer from './Musicplayer';
import './dashboard.css';

class Dashboard extends Component {
    render() {
        return(
            <div className="dashboard">
                <Musicplayer />
            </div>
        )
    }
}

export default Dashboard
