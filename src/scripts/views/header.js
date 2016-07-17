import React from 'react'
import ACTIONS from '../actions/actions.js'

const Header = React.createClass({
    render: function() {
        return (
            <div id="headerContainer">
                <marquee height="100" behavior="alternate" direction="right" >HORRIBLOG</marquee>
                <NavBar />
            </div>
            )
    }
})

const NavBar = React.createClass({
    render: function() {
        return (
            <div id="navBar">
                <a href="#login">log in</a>
                <a href="#posts/readMine">My Posts</a>
                <a href="#posts/readAll">ALL</a>
                <a href="#posts/write">compose</a>
                <a href="#login" onClick={ACTIONS.logUserOut} >log out</a>
            </div>
            )
    }
})

export default Header