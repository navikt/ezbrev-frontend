import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as brevdataActions from  '../../actions/brevdataActions';

import BrevpakkeSelect from './partials/BrevpakkeSelect';
import BrevdataInput from './partials/BrevdataInput';
import BrevdataMeta from './partials/BrevdataMeta';

class HomePage extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.miljoList = ["t0", "t1", "t2", "q0", "q1", "q2"]
        this.versjon = ["1.0.1"]
        this.leveranseList = ["2017-HL1", "2018-HL2"]
        this.brevpakkeList = ["Arena", "Infotrygd", "Pesys01", "Ray", "Foreldrepenger"]

        this.state = {
            brevdata: {xml: ""}

        };
    }

    render() {
        return (
            <main className="container-fluid">
                <h4>Brevdata</h4>
                <BrevpakkeSelect miljoList={this.miljoList} />
                <BrevdataInput
                    brevdata={this.state.brevdata}
                    actions={this.props.actions}/>
                <BrevdataMeta/>
            </main>
        );
    }
}

HomePage.propTypes = {
    brevdata: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        brevdata: state.brevdata
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(brevdataActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);