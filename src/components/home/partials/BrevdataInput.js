import React from 'react';
import PropTypes from 'prop-types';
import BrevdataControl from './BrevdataControl';
import { connect } from 'react-redux';
import * as brevdataActions from '~/actions/brevdataActions';
import { bindActionCreators } from 'redux';

class BrevdataInput extends React.Component {
    render() {
        return (
            <section className="col-md-6 float-left">
                <textarea
                    className="form-horizontal form-control"
                    id="brevdata_input"
                    placeholder="Legg inn XML"
                    value={this.props.brevdataXML}
                    onChange={event => {
                        this.props.actions.changeBrevdataXML(
                            event.target.value
                        );
                    }}
                />

                <BrevdataControl />
            </section>
        );
    }
}

BrevdataInput.propTypes = {
    brevdataXML: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        brevdataXML: state.brevdataReducer.brevdata.xmlInnhold
    };
}

function mapDispatchToProps(dispatch) {
    return {
        /*changeXML: (args) => dispatch(action.change(args))*/
        actions: bindActionCreators(
            brevdataActions,
            dispatch
        ) /* wrapper alle actions i mappen bindActionCreators i et kall til dispatch*/
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BrevdataInput);
