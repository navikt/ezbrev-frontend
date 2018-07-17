import React from 'react';
import {withRouter} from 'react-router';
import {connect} from "react-redux";
import AdminPage from "./AdminPage";


class AuthenticatedComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        console.log(this.props.isAdmin)

        if(this.props.isAdmin){
            return <AdminPage/>;
        }

        return <p>Du har ikke admin-tilgang.</p>;
    }

}

function mapStateToProps(state, ownProps) {
    return {
        isAdmin:state.admin.isAdmin
    };
}


export default connect(
    mapStateToProps
)(AuthenticatedComponent);
