import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Ping from './Ping.js';
import { InternalHeader, Loader } from '@navikt/ds-react';
import '@navikt/ds-css';

/*
    showAdmin = () => {
        if (this.props.isAdmin) {
            return (
                <NavLink to="/admin" activeClassName="active">
                    Admin
                </NavLink>
            );
        }
    };
   */

const Header = ({ loading }) => (
    <InternalHeader>
        <InternalHeader.Title>Ez-Brev</InternalHeader.Title>
        <NavLink to="/" end className="navbar-link">
            <InternalHeader.Button>Rediger brevdata</InternalHeader.Button>
        </NavLink>
        <NavLink to="/inspection" className="navbar-link">
            <InternalHeader.Button>XML Inspeksjon</InternalHeader.Button>
        </NavLink>
        <NavLink to="/converter" className="navbar-link">
            <InternalHeader.Button>XML Converter</InternalHeader.Button>
        </NavLink>
        <Ping />
        {(loading && (
            <Loader size="large" title="venter..." variant="inverted" />
        )) ||
            ''}
    </InternalHeader>
);

const mapStateToProps = (state) => ({
    loading: state.loading.isLoading,
});

export default connect(mapStateToProps)(Header);
