import React from 'react';
import PropTypes from 'prop-types';
import BrevdataControl from './BrevdataControl';

class BrevdataInput extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            brevdata: { xml: '' }
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.onChangeSave = this.onChangeSave.bind(this);
    }

    onInputChange(event) {
        const brevdata = this.state.brevdata;
        brevdata.xml = event.target.value;
        this.setState({ brevdata: brevdata });
    }

    onChangeSave() {
        this.props.actions.saveBrevdata(this.state.brevdata);
    }

    render() {
        return (
            <section className="col-md-6 float-left">
                <textarea
                    className="form-horizontal form-control"
                    id="brevdata_input"
                    placeholder="Legg inn XML"
                    value={this.state.brevdata.xml}
                    onChange={this.onInputChange}
                />

                <BrevdataControl />
            </section>
        );
    }
}

BrevdataInput.propTypes = {
    brevdata: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

export default BrevdataInput;
