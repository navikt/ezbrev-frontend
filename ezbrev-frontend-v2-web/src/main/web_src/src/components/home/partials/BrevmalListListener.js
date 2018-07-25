/**
 * Created by M153892 on 25.07.2018.
 */
import React from 'react';
import { connect } from 'react-redux';
import * as _ from "lodash";

class BrevmalListListener extends React.Component {
    componentDidUpdate = () => {
        if (this.props.brevdataList.length === 0) {
            const brevmal = JSON.parse(localStorage.getItem('brevmal'));
            const brevmalList = this.props.brevmalList;
            for (let i = 0; i < brevmalList.length; i++) {
                if (_.isEqual(brevmalList[i], brevmal) && brevmal !== null) {
                    this.props.selectBrevmal(brevmal);
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
        brevmalList: state.menyValg.brevmalList,
        brevdataList: state.menyValg.brevdataList
    };
}

export default connect(mapStateToProps)(BrevmalListListener);
