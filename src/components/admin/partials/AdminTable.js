import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AdminTableItem from '~/components/admin/partials/AdminTableItem';
import * as adminActions from '~/actions/adminActions';
import * as adminActionsUtil from '~/actions/adminActionsUtil';
import { Accordion } from '@navikt/ds-react';

const AdminTable = ({
    miljoList,
    brevInfo,
    brevpakkeList,
    brevmalList,
    miljo,
    brevpakke,
    brevdataList,
    utilActions,
    actions,
}) => {
    return (
        <div>
            <br />
            <h4>Brevmaler</h4>
            <Accordion>
                {brevmalList.map((item) => (
                    <AdminTableItem key={item.malId} item={item} />
                ))}
            </Accordion>
        </div>
    );
};

function mapStateToProps(state, ownProps) {
    return {
        miljoList: state.admin.adminMiljoList,
        brevInfo: state.admin.adminBrevInfo,
        brevpakkeList: state.admin.adminBrevpakkeList,
        brevmalList: state.admin.adminBrevmalList,
        miljo: state.admin.adminMiljo,
        brevpakke: state.admin.adminBrevpakke,
        brevdataList: state.admin.adminBrevdataList,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        utilActions: bindActionCreators(adminActionsUtil, dispatch),
        actions: bindActionCreators(adminActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminTable);
