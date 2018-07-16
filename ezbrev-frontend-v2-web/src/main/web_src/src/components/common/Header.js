import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '~/actions/menyValgActionsUtil'; //Spør om miljoliste når siden lastes

class Header extends React.Component {
    handleClick = () => {
        if (this.props.miljoList.length !== 0) {
            console.log(this.props.miljoList.length);
            window.alert('Du er allerede pålogget');
        } else {
            this.props.actions.fetchMiljoList();
        }
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
