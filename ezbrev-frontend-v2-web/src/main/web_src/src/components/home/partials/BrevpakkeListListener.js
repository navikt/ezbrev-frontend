import React from 'react';
import { connect } from 'react-redux';

class BrevpakkeListListener extends React.Component {
    componentDidUpdate = () => {
        if (
            Object.keys(this.props.brevmalList).length === 0 &&
            this.props.brevmalList.length === 0
        ) {
            const brevpakke = localStorage.getItem('brevpakke');
            if (
                this.props.brevpakkeList.indexOf(brevpakke) >= 0 &&
                brevpakke !== null
            ) {
                this.props.selectBrevpakke(brevpakke);
            }
        }
    };

    render() {
        return <div />;
    }
}

function mapStateToProps(state, ownProps) {
    return {
        brevpakkeList: state.menyValg.brevpakkeList,
        brevmalList: state.menyValg.brevmalList
    };
}

export default connect(mapStateToProps)(BrevpakkeListListener);
