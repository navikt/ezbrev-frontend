import React from 'react';
import {Link, IndexLink} from 'react-router';

const Header = () => {
    return (
        <div className="container-fluid">
            <nav className="navbar">                                               { /* defines a set of navigation links*/}
                <div className="navbar-header">
                    <span className="navbar-brand">Ez-Brev 4</span>
                </div>
                <div className="collapse navbar-collapse">
                    <ul className="nav navbar-nav">                                 {/*unordered list*/}
                        <li className="active">
                            <IndexLink to="/" activeClassName="active">Rediger brevdata </IndexLink>
                        </li>
                        <li>
                            <Link to="/regression" className="navbar-link"
                                  activeClassName="active">Regresjonstest</Link>
                        </li>
                        <li>
                            <Link to="/inspection" activeClassName="active">XML Inspeksjon</Link>
                        </li>
                        <li>
                            <Link to="/converter" activeClassName="active">XML Converter</Link>
                        </li>
                        <li>
                            <Link to="/admin" activeClassName="active">Admin</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Header;

