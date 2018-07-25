import React from 'react';
import { bindActionCreators } from 'redux';
import * as menyValgActions from '~/actions/menyValgActions';
import * as menyValgActionsUtil from '~/actions/menyValgActionsUtil';
import { connect } from 'react-redux';
import AdminTableItem from '~/components/admin/partials/AdminTableItem';
import * as adminActions from '~/actions/adminActions';
import * as adminActionsUtil from '~/actions/adminActionsUtil';

class AdminTable extends React.Component {
    render() {
        return (
            <div>
                <br />
                <h4>Brevmaler</h4>
                {this.props.brevmalList.map(item => (
                    <AdminTableItem key={item.malId} item={item} />
                ))}
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        miljoList: state.admin.adminMiljoList,
        brevInfo: state.admin.adminBrevInfo,
        brevpakkeList: state.admin.adminBrevpakkeList,
        brevmalList: state.admin.adminBrevmalList,
        miljo: state.admin.adminMiljo,
        brevpakke: state.admin.adminBrevpakke,
        brevdataList: state.admin.adminBrevdataList
    };
}

function mapDispatchToProps(dispatch) {
    return {
        utilActions: bindActionCreators(adminActionsUtil, dispatch),
        actions: bindActionCreators(adminActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminTable);
