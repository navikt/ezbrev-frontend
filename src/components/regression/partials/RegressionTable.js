import React from 'react';
import TableItem from '~/components/regression/partials/RegressionTableItem';
import { bindActionCreators } from 'redux';
import * as menyValgActions from '~/actions/menyValgActions';
import * as menyValgActionsUtil from '~/actions/menyValgActionsUtil';
import { connect } from 'react-redux';
import { Col, Row } from 'react-bootstrap';

class RegressionTable extends React.Component {
    handleClick = e => {
        e.preventDefault();
        console.log(this.props.brevmalList);
    };

    sammenlign = brevdataId => {
        console.log('Sammenlignet', brevdataId);
    };

    brevdata = malId => {
        if (malId in this.props.brevdataList) {
            return (
                <div>
                    {this.props.brevdataList[malId].map(brevdata => (
                        <div key={brevdata.brevdataId}>
                            {brevdata.beskrivelse}
                            <button
                                onClick={() =>
                                    this.sammenlign(brevdata.brevdataId)
                                }
                            >
                                Sammenlign
                            </button>
                        </div>
                    ))}
                </div>
            );
        }
    };

    render() {
        return (
            <div>
                {this.props.brevmalList.map(item => (
                    <div key={item.malId}>
                        <Row>
                            <Col sm={2}>{item.malId}</Col>
                            <Col sm={2}>{item.tittel}</Col>
                            <Col sm={2}>
                                <button onClick={this.handleClick}>hei</button>
                            </Col>
                        </Row>
                        {this.brevdata(item.malId)}
                    </div>
                ))}
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        miljoList: state.regressjonMenyValg.miljoList,
        brevInfo: state.regressjonMenyValg.brevInfo,
        brevpakkeList: state.regressjonMenyValg.brevpakkeList,
        brevmalList: state.regressjonMenyValg.brevmalList,
        miljo: state.regressjonMenyValg.miljo,
        brevpakke: state.regressjonMenyValg.brevpakke,
        brevdataList: state.regressjonMenyValg.brevdataList
    };
}

function mapDispatchToProps(dispatch) {
    return {
        utilActions: bindActionCreators(menyValgActionsUtil, dispatch),
        actions: bindActionCreators(menyValgActions, dispatch)
        /* wrapper alle actions i mappen bindActionCreators i et kall til dispatch*/
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegressionTable);
