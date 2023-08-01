import React from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';

class BrevmalListListener extends React.Component {
    componentDidUpdate = () => {
        if (this.props.brevdataList.length === 0) {
            const savedBrevmal = localStorage.getItem('brevmal');
            if (savedBrevmal) {
                try {
                    const brevmal = JSON.parse(savedBrevmal);
                    const brevmalList = this.props.brevmalList;
                    for (let i = 0; i < brevmalList.length; i++) {
                        if (
                            _.isEqual(brevmalList[i], brevmal) &&
                            brevmal !== null
                        ) {
                            this.props.selectBrevmal(brevmal);
                        }
                    }
                } catch (e) {
                    console.log('Failed to parse JSON', e);
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
        brevdataList: state.menyValg.brevdataList,
    };
}

export default connect(mapStateToProps)(BrevmalListListener);
