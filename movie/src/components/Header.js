import React from 'react';
import './Header.css';

function Header(){
    return (
        <header className="center-max-size header">
        <span className={"brand"}>MovieSimple</span>
          <form className="form">
            <input className="search" type="text" id="search"/>
            <button className="submit-search" type="submit"><i className="fa fa-search"></i></button>
          </form>
      </header>
    )
}

export default Header;