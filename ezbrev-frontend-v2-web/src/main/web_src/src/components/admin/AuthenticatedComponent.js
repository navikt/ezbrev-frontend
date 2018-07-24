import React from 'react';
import {withRouter} from 'react-router';
import {connect} from "react-redux";
import AdminPage from "./AdminPage";


class AuthenticatedComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        if(this.props.isAdmin){
            return <AdminPage/>;
        }

        return <AdminPage/>;
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
