import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './style.css'
import './style1.css'
import maginifyingGlass from './magnifying-glass.png'

export default function Navbar() {
    const navigate = useNavigate();

    const handleClick1 = (e) => {
        e.preventDefault();
        let searchKey = document.getElementsByClassName("searchInput")[0].value;
        if (searchKey !== "") {
            navigate(`/search/${searchKey}`);
        }
    }
    
    const handleClick2 = (e) => {
        e.preventDefault();
        let searchInput = document.getElementById("searchInput2");
        let toggleSearchCont = document.getElementsByClassName("toggleSearchCont")[0];
        if (toggleSearchCont.value !== "") {
            navigate(`/search/${searchInput.value}`);
            toggleSearchCont.style.display = "none";
        }
    }

    const menuClick = () => {
        let menu = document.getElementsByClassName("menu")[0];
        menu.classList.toggle('opened');
        menu.setAttribute('aria-expanded', menu.classList.contains('opened'));

        let menuOption = document.getElementsByClassName('menuOption')[0];
        menuOption.classList.toggle('menuOptionContOpen');
        menuOption.classList.toggle('menuOptionCont');

        let menuOptionBox = document.getElementsByClassName('menuOptionBox')[0];
        if (menuOptionBox.style.display === "none") {
            menuOptionBox.style.display = "flex";
        }
        else {
            menuOptionBox.style.display = "none";
        }
    }

    const handleMagnifying = () => {
        let toggleSearchCont = document.getElementsByClassName("toggleSearchCont")[0];
        if (toggleSearchCont.style.display === "none") {
            toggleSearchCont.style.display = "flex";
        }
        else {
            toggleSearchCont.style.display = "none";
        }
    }

    return (
        <div className='navbar'>
            <div style={{ display: "flex", justifyContent: "flexStart", alignItems: "center", flex: "1.4" }}>
                <button className="menu" onClick={menuClick} aria-label="Main Menu">
                    <svg width="100" height="100" viewBox="0 0 100 100">
                        <path className="line line1" d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
                        <path className="line line2" d="M 20,50 H 80" />
                        <path className="line line3" d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
                    </svg>
                </button>
                <div><Link to="/" className="title"><span>Enjoy</span><span style={{ backgroundColor: "#ff2525", borderRadius: "5px" }}>Movies</span></Link></div>
                <div className="categories">
                    <ul style={{ paddingLeft: "0px" }}>
                        <Link className='navItem' to='/' style={{ marginLeft: "0px" }}>Now Playing</Link>
                        <Link className='navItem' to='/popular'>Popular</Link>
                        <Link className='navItem' to='/toprated'>Top Rated</Link>
                        <Link className='navItem' to='/upcoming'>Upcoming</Link>
                    </ul>
                </div>
            </div>
            <form className="searchCont" onSubmit={handleClick1}>
                <input type="text" className='searchInput' placeholder='Search for Movies' />
                <button className='searchButt' type="submit">Search</button>
            </form>
            <div><img src={maginifyingGlass} className="magnifyingGlass" alt="Search" onClick={handleMagnifying} /></div>
            <form className="toggleSearchCont" onSubmit={handleClick2} style={{ display: "none" }}>
                <input type="text" className='searchInput' id="searchInput2" placeholder='Search for Movies' />
                <button className='searchButt' type="submit">Search</button>
            </form>
            <div className='menuOption menuOptionCont'>
                <div className="menuOptionBox" style={{ display: 'none' }} >
                    <Link onClick={menuClick} className='subMenuItem' to='/'>Now Playing</Link>
                    <Link onClick={menuClick} className='subMenuItem' to='/popular'>Popular</Link>
                    <Link onClick={menuClick} className='subMenuItem' to='/toprated'>Top Rated</Link>
                    <Link onClick={menuClick} className='subMenuItem' to='/upcoming'>Upcoming</Link></div>
            </div>
        </div>
    )
}
