import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '~/actions/menyValgActionsUtil';
import Ping from './Ping';
import SpinningWheel from './SpinningWheel';
import {InternalHeader} from '@navikt/ds-react';
import '@navikt/ds-css';

class Header extends React.Component {
    logIn = () =>
        this.props.miljoList.length === 0 ? (
            <a>
                <Button
                    onClick={() => {
                        this.props.actions.fetchMiljoList();
                        this.props.miljoList.length === 0
                            ? alert(
                                  'Dersom du sliter med å logge inn kan kan du gå til "https://ezbrev-backend-q4.nais.preprod.local/rest/env". Deretter trykke "Avansert" og "Fortsett"'
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
    showAdmin = () => {
        if (this.props.isAdmin) {
            return (
                <NavLink to="/admin" activeClassName="active">
                    Admin
                </NavLink>
            );
        }
    };

    render() {
        return (
            <InternalHeader>
            <InternalHeader.Title>Ez-Brev 4</InternalHeader.Title>
            <InternalHeader.Button>
            <NavLink
            to="/"
            exact
            >
            Rediger brevdata
            </NavLink>
            </InternalHeader.Button>
            <InternalHeader.Button>
            <NavLink
            to="/regression"
            className="navbar-link"
            >
            Regresjonstest
            </NavLink>
            </InternalHeader.Button>
            <InternalHeader.Button>
            <NavLink
            to="/inspection"
            >
            XML Inspeksjon
            </NavLink>
            </InternalHeader.Button>
            <InternalHeader.Button>
            <NavLink
            to="/converter"
            >
            XML Converter
            </NavLink>
            </InternalHeader.Button>
            <InternalHeader.User>
            <Ping />
            </InternalHeader.User>

            </InternalHeader>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        miljoList: state.menyValg.miljoList,
        isAdmin: state.admin.isAdmin
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
