import React from 'react';
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';

class SpinningWheel extends React.Component {
    render() {
        if (this.props.isLoading) {
            return <ReactLoading type="spin"/>;
        } else {
            return null;
        }
    }
}

function mapStateToProps(state, ownProps) {
    return {
        isLoading: state.loading.isLoading
    };
}

export default connect(mapStateToProps)(SpinningWheel);
