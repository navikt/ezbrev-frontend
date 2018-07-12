import React from 'react';
import {bindActionCreators} from 'redux';
import * as menyValgActions from '~/actions/menyValgActions';
import * as menyValgActionsUtil from '~/actions/menyValgActionsUtil';
import {connect} from 'react-redux';
import RegressionTableItem from '~/components/regression/partials/RegressionTableItem';
import * as regressionActions from "~/actions/RegressionActions";
import * as regressionActionsUtil from "~/actions/RegressionActionsUtil";

class RegressionTable extends React.Component {
    sammenlign = (brevdataId, brevmal) => {
        console.log('Sammenlignet'); //, bestillPdfByBrevdataId(this.props.miljo, brevmal, brevdataId));
    };

    render() {
        return (
            <div>
                {this.props.brevmalList.map(item => (
                    <RegressionTableItem
                        key={item.malId}
                        item={item}
                        sammenlign={this.sammenlign}
                    />
                ))}
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        miljoList: state.regressjonReducer.regressjonMiljoList,
        brevInfo: state.regressjonReducer.regressjonBrevInfo,
        brevpakkeList: state.regressjonReducer.regressjonBrevpakkeList,
        brevmalList: state.regressjonReducer.regressjonBrevmalList,
        miljo: state.regressjonReducer.regressjonMiljo,
        brevpakke: state.regressjonReducer.regressjonBrevpakke,
        brevdataList: state.regressjonReducer.regressjonBrevdataList
    };
}

function mapDispatchToProps(dispatch) {
    return {
        utilActions: bindActionCreators(regressionActionsUtil, dispatch),
        actions: bindActionCreators(regressionActions, dispatch)
        /* wrapper alle actions i mappen bindActionCreators i et kall til dispatch*/
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegressionTable);
