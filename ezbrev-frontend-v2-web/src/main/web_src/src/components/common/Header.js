import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import LogInForm from './LogInForm';

const Header = () => {
    const logInPopover = (
        <Popover id="popover-trigger-click-root-close" title="Log in:">
            <LogInForm />
        </Popover>
    );

    return (
        <div className="container-fluid">
            <nav className="navbar">
                <div className="navbar-header">
                    <span className="navbar-brand">Ez-Brev 4 beta</span>
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
                        <li>
                            <a>
                                <OverlayTrigger
                                    trigger="click"
                                    rootClose
                                    placement="bottom"
                                    overlay={logInPopover}
                                >
                                    <Button>
                                        Log in
                                    </Button>
                                </OverlayTrigger>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Header;
