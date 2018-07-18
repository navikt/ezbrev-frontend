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
                    value={this.props.xmlInnhold}
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
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        xmlInnhold: state.brevdataReducer.xmlInnhold
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(brevdataActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BrevdataInput);
