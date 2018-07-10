import React from 'react';
import {
    Button,
    Col,
    ListGroup,
    ListGroupItem,
    Panel,
    Row
} from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import * as menyValgActionsUtil from '~/actions/menyValgActionsUtil';
import * as menyValgActions from '~/actions/menyValgActions';
import { connect } from 'react-redux';
import Brev from '../partials/Brev';

class RegressionTableItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShown: false
        };
    }

    render() {
        const item = this.props.item;
        const sammenlign = this.props.sammenlign;
        return (
            <Panel>
                <Panel.Heading
                    onClick={() =>
                        this.setState({ isShown: !this.state.isShown })
                    }
                >
                    <Row>
                        <Col sm={3}>{item.malId}</Col>
                        <Col sm={3}>{item.tittel}</Col>
                        <Col sm={3}>
                            <Button
                                className={'btn btn-primary'}
                                onClick={this.handleClick}
                            >
                                hei
                            </Button>
                        </Col>
                    </Row>
                </Panel.Heading>
                {this.state.isShown ? (
                    <ListGroup>
                        <ListGroupItem>
                            <Row>
                                <Col sm={3}>Beskrivelse</Col>
                                <Col sm={3}>Likhet</Col>
                                <Col sm={3}>
                                    <Button bsSize="small">Regtest mal</Button>
                                </Col>
                            </Row>
                        </ListGroupItem>
                        {Brev(item.malId, sammenlign, this.props.brevdataList, this.props.regressionSimilarity)}
                    </ListGroup>
                ) : null}
            </Panel>
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
        brevdataList: state.regressjonReducer.regressjonBrevdataList,
        regressionSimilarity: state.regressjonReducer.regressionSimilarity
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
)(RegressionTableItem);
