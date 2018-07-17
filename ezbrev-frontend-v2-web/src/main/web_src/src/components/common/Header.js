import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '~/actions/menyValgActionsUtil';
import ErrorModal from './ErrorModal';
import Ping from "./Ping";

class Header extends React.Component {
    handleClick = () => {
        if (this.props.miljoList.length !== 0) {
            console.log(this.props.miljoList.length);
            window.alert('Du er allerede pålogget');
        } else {
            this.props.actions.fetchMiljoList();
        }
    };

    popoverClick = () => {
        return (
            <Popover id="popover-trigger-hover-focus" title="Selftest">
                <Ping />
            </Popover>
        );
    };

    render() {
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
                            <li>
                                <a>
                                    <Button onClick={() => this.handleClick()}>
                                        Log in
                                    </Button>
                                </a>
                            </li>
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
