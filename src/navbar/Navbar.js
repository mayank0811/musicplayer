import React, { Component } from 'react';
import './navbarofpage.css';
import musicicon from '../images/sound.png';

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar1">                 
                <div className="navbarcontent">
                    <div className="navbarhead">Musico</div>
                    <img src={musicicon} className="musicicon" alt="musicicon"></img>
                </div> 
            </nav>
        )
    }
}

export default Navbar
