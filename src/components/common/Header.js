import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Ping from './Ping.js';
import { InternalHeader, Loader } from '@navikt/ds-react';
import '@navikt/ds-css';

const Header = ({ loading }) => (
    <InternalHeader>
        <InternalHeader.Title>Ez-Brev</InternalHeader.Title>
        <InternalHeader.Button>
            <NavLink to="/" exact>
                Rediger brevdata
            </NavLink>
        </InternalHeader.Button>
        <InternalHeader.Button>
            <NavLink to="/regression" className="navbar-link">
                Regresjonstest
            </NavLink>
        </InternalHeader.Button>
        <InternalHeader.Button>
            <NavLink to="/inspection">XML Inspeksjon</NavLink>
        </InternalHeader.Button>
        <InternalHeader.Button>
            <NavLink to="/converter">XML Converter</NavLink>
        </InternalHeader.Button>
        <InternalHeader.Button>
            <Ping />
            {(loading && (
                <Loader size="large" title="venter..." variant="inverted" />
            )) ||
                ''}
        </InternalHeader.Button>
    </InternalHeader>
);

const mapStateToProps = (state) => ({
    loading: state.loading.isLoading,
});

export default connect(mapStateToProps)(Header);
