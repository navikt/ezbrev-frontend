import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as brevdataActions from  '../../actions/brevdataActions';

import BrevpakkeSelect from './partials/BrevpakkeSelect';
import BrevdataInput from './partials/BrevdataInput';
import BrevdataMeta from './partials/BrevdataMeta';

class HomePage extends React.Component {                        //container component

    constructor(props, context) {
        super(props, context);
    /*
        this.state = {
            brevdata: {xml: ""}                             // endrer bare staten til Homepage ikke hele storen

        };
        */
    }

    render() {
        return (
            <main className="container-fluid">
                <h4>Brevdata</h4>
                <BrevpakkeSelect />
                <BrevdataInput
                    brevdata={this.props.brevdata}
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
        actions: bindActionCreators(brevdataActions, dispatch)                  /* wrapper alle actions i mappen bindActionCreators i et kall til dispatch*/
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);