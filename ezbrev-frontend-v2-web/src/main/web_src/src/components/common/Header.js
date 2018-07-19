import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '~/actions/menyValgActionsUtil';
import ErrorModal from './ErrorModal';
import Ping from './Ping';

class Header extends React.Component {
    popoverClick = () => {
        return (
            <Popover id="popover-trigger-hover-focus" title="Selftest">
                <Ping />
            </Popover>
        );
    };

    logIn = () =>
        this.props.miljoList.length === 0 ? (
            <a>
                <Button onClick={() => this.props.actions.fetchMiljoList()}>
                    Log in
                </Button>
            </a>
        ) : (
            <div />
        );

    render() {
        return (
            <div className="container-fluid">
                <nav className="navbar">
                    <div className="navbar-header">
                        <span className="navbar-brand">Ez-Brev 4 ALPHA</span>
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
                                <NavLink to="/admin" activeClassName="active">
                                    Admin
                                </NavLink>
                            </li>
                            <li>{this.logIn()}</li>
                            <li>
                                <OverlayTrigger
                                    trigger={['hover', 'focus']}
                                    placement="left"
                                    overlay={this.popoverClick()}
                                >
                                    <a>Ping</a>
                                </OverlayTrigger>
                            </li>
                        </ul>
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
