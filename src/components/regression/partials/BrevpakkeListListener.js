import React from 'react';
import { connect } from 'react-redux';

class BrevpakkeListListener extends React.Component {
    componentDidUpdate = () => {
        if (Object.keys(this.props.brevdataList).length === 0) {
            const brevpakke = localStorage.getItem('regressionBrevpakke');
            if (this.props.brevpakkeList.indexOf(brevpakke) >= 0) {
                if (brevpakke !== null) {
                    this.props.action(brevpakke);
                }
            }
        }
    };

    render() {
        return <div />;
    }
}

function mapStateToProps(state, ownProps) {
    return {
        brevpakkeList: state.regressjonReducer.regressjonBrevpakkeList,
        brevdataList: state.regressjonReducer.regressjonBrevdataList
    };
}

export default connect(mapStateToProps)(BrevpakkeListListener);
