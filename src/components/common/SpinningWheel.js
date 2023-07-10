import React from 'react';
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';


class SpinningWheel extends React.Component {
    render() {
        if (this.props.isLoading) {
            return (
                <div className="spinner">
                <ReactLoading type={"cylon"} height={70} width={70}/>
                </div>
            )
        } else {
            return null;
        }
    }
}

function mapStateToProps(state) {
    return {
        isLoading: state.loading.isLoading
    };
}

export default connect(mapStateToProps)(SpinningWheel);
