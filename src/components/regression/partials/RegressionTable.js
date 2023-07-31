import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RegressionTableItem from '~/components/regression/partials/RegressionTableItem';
import * as regressionActions from '~/actions/regressionActions';
import * as regressionActionsUtil from '~/actions/regressionActionsUtil';
import { Accordion } from '@navikt/ds-react';

class RegressionTable extends React.Component {
    render() {
        return (
            <Accordion>
                {this.props.brevmalList.map((item) => (
                    <RegressionTableItem key={item.malId} item={item} />
                ))}
            </Accordion>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        brevmalList: state.regressjonReducer.regressjonBrevmalList,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        utilActions: bindActionCreators(regressionActionsUtil, dispatch),
        actions: bindActionCreators(regressionActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegressionTable);
