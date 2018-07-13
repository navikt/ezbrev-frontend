import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <div className="container-fluid">
            <nav className="navbar">
                <div className="navbar-header">
                    <span className="navbar-brand">Ez-Brev 3</span>
                </div>
                <div className="collapse navbar-collapse">
                    <ul className="nav navbar-nav">
                        <li className="active">
                            <NavLink to="/" exact activeClassName="active">
                                Rediger brevdata
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/regression"
                                className="navbar-link"
                                activeClassName="active"
                            >
                                Regresjonstest
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/inspection" activeClassName="active">
                                XML Inspeksjon
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/converter" activeClassName="active">
                                XML Converter
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin" activeClassName="active">
                                Admin
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Header;
