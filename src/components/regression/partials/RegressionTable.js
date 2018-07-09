import React from 'react';
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
        utilActions: bindActionCreators(menyValgActionsUtil, dispatch),
        actions: bindActionCreators(menyValgActions, dispatch)
        /* wrapper alle actions i mappen bindActionCreators i et kall til dispatch*/
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegressionTable);
