import React from 'react';
import {Link, IndexLink} from 'react-router';

const Header = () => {
    return (
        <div className="container-fluid">
            <nav className="navbar">
                <a className="navbar-brand" href="#!">Ez-Brev 3</a>
                <IndexLink to="/" activeClassName="active">Rediger brevdata</IndexLink>
                {" | "}
                <Link to="/regression" activeClassName="active">Regresjonstest</Link>
                {" | "}
                <Link to="/about" activeClassName="active">XML Inspeksjon</Link>
                {" | "}
                <Link to="/about" activeClassName="active">XML Converter</Link>
                {" | "}
                <Link to="/admin" activeClassName="active">Admin</Link>
            </nav>
        </div>
    );
};

export default Header;

