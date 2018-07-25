import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import ReactLoading from 'react-loading';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '~/actions/menyValgActionsUtil';
import ErrorModal from './ErrorModal';
import Ping from './Ping';
import SpinningWheel from './SpinningWheel';

class Header extends React.Component {
    logIn = () =>
        this.props.miljoList.length === 0 ? (
            <a>
                <Button
                    onClick={() => {
                        this.props.actions.fetchMiljoList();
                        this.props.miljoList.length === 0
                            ? alert(
                                  'Dersom du sliter med å logge inn kan kan du gå til "http://ezbrev-backend-q4.nais.preprod.local/rest/env". Deretter trykke "Avansert" og "Fortsett"'
                              )
                            : null;
                    }}
                >
                    Log in
                </Button>
            </a>
        ) : (
            <div />
        );

    render() {
        return (
            <div>
                <nav className="navbar">
                    <div className="pageSize">
                        <div className="flex-row center-vertically">
                            <div className="navbar-header">
                                <span className="navbar-brand">Ez</span>
                            </div>
                            <ul className="nav navbar-nav navbar-flex center-content">
                                <li className="active">
                                    <NavLink
                                        to="/"
                                        exact
                                        activeClassName="active"
                                    >
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
                                    <ErrorModal />
                                    <NavLink
                                        to="/inspection"
                                        activeClassName="active"
                                    >
                                        XML Inspeksjon
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/converter"
                                        activeClassName="active"
                                    >
                                        XML Converter
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/admin"
                                        activeClassName="active"
                                    >
                                        Admin
                                    </NavLink>
                                </li>
                                <li>{this.logIn()}</li>
                            </ul>
                            <SpinningWheel />
                            <Ping />
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        miljoList: state.menyValg.miljoList
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
