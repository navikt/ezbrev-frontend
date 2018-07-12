import React from 'react';
import PropTypes from 'prop-types';
import { pre, DropdownButton, MenuItem, Row } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as errorActions from "~/actions/errorActions";

class ErrorDisplay extends React.Component{
    render(){
        return(
            <section>
            <h4>Feilmeldinger</h4>
            <pre>
                {this.props.errorList}
            </pre>
            </section>
        )
    }
}

ErrorDisplay.propTypes = {
    //brevdataList: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        errorList:state.error.errorList
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(errorActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ErrorDisplay);
