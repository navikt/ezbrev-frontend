import React from 'react';
import { connect } from 'react-redux';

class BrevpakkeListListener extends React.Component {
    render() {
        const brevpakke = localStorage.getItem('regressionBrevpakke');
        if (this.props.brevpakkeList.indexOf(brevpakke)>=0) {
            brevpakke !== null ? this.props.action(brevpakke) : '';
        }
        return <div >{brevpakke in this.props.brevpakkeList}</div>;
    }
}

function mapStateToProps(state, ownProps) {
    return {
        brevpakkeList: state.regressjonReducer.regressjonBrevpakkeList
    };
}

export default connect(mapStateToProps)(BrevpakkeListListener);
