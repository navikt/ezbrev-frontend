import React from 'react';
import { connect } from 'react-redux';
import AdminPage from './AdminPage';

class AuthenticatedComponent extends React.Component {
    render() {
        if (this.props.isAdmin) {
            return <AdminPage />;
        } else {
            return (
                <div className="text-center">
                    <br />
                    <p> Du har ikke admin-tilgang</p>
                </div>
            );
        }
    }
}

function mapStateToProps(state, ownProps) {
    return {
        isAdmin: state.admin.isAdmin
    };
}

export default connect(mapStateToProps)(AuthenticatedComponent);
