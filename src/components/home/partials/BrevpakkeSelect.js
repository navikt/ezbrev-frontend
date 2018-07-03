import React from 'react';
import PropTypes from 'prop-types';
import {DropdownButton, MenuItem, Row} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as menyValgActionsUtil from '../../../actions/menyValgActionsUtil';
import * as menyValgActions from '../../../actions/menyValgActions';


function ListItem({title, id, func, list}) {
    return (
        <DropdownButton title={title} id={id} onSelect={func}>
            {list.map(i => (
                <MenuItem key={i} eventKey={i}>
                    {' '}
                    {i}{' '}
                </MenuItem>
            )) /*mulig at vi må ha annen eventKey her. Feilmelding: missing key prop for element in iterator*/}
        </DropdownButton>
    );
}

ListItem.propTypes = {
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    func: PropTypes.func.isRequired,
    list: PropTypes.array.isRequired
};

//endre slik at knappene viser hvilket valg som er tatt, lagre dette i den lokale staten?

class BrevpakkeSelect extends React.Component {
    //container component
    constructor(props, context) {
        super(props, context);

        this.state = {
            titlemiljo: 'Velg miljø',
            titlebrevpakke: 'Velg brevpakke',
            titlebrevmal: 'Velg brevmal'
        };
    }

    render() {
        return (
            <section className="col-md-2 float-left">
                <Row>
                    <ListItem
                        title={this.state.titlemiljo}
                        id="brevpakke_env_pick"
                        func={miljo => {
                            this.props.utilActions.selectMiljo(miljo);
                            this.props.actions.setMiljo(miljo);
                            this.setState({titlemiljo: miljo});
                        }}
                        list={this.props.miljoList}
                    />
                </Row>
                <Row>
                    <ListItem
                        title={this.state.titlebrevpakke}
                        id="brevpakke_pick"
                        func={brevpakke => {
                            let brevInfo = this.props.brevInfo;
                            this.props.utilActions.selectBrevpakke(
                                brevpakke,
                                brevInfo
                            );
                            this.props.actions.setBrevpakke(brevpakke);
                            this.setState({titlebrevpakke: brevpakke});
                        }}
                        list={this.props.brevpakkeList}
                    />
                </Row>
                <Row>
                    <ListItem
                        title={this.state.titlebrevmal}
                        id="brevpakke_mal_pick"
                        func={brevmal => {
                            console.log(this.props.brevpakke)
                            this.props.utilActions.selectBrevmal(
                                brevmal,
                                this.props.brevpakke
                            );
                            this.props.actions.setBrevmal(brevmal);
                            this.setState({titlebrevmal: brevmal});
                        }}
                        list={this.props.brevmalList}
                    />
                </Row>
            </section>
        );
    }
}

BrevpakkeSelect.propTypes = {
    miljoList: PropTypes.array.isRequired,
    brevInfo: PropTypes.array.isRequired,
    brevpakkeList: PropTypes.array.isRequired,
    brevmalList:PropTypes.array.isRequired,
    brevpakke:PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired,
    utilActions:PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        miljoList: state.menyValg.miljoList,
        brevInfo: state.menyValg.brevInfo,
        brevpakkeList: state.menyValg.brevpakkeList,
        brevmalList: state.menyValg.brevmalList,
        brevpakke:state.menyValg.brevpakke
    };
}

function mapDispatchToProps(dispatch) {
    return {
        utilActions: bindActionCreators(menyValgActionsUtil, dispatch),
        actions:bindActionCreators(menyValgActions,dispatch)
        /* wrapper alle actions i mappen bindActionCreators i et kall til dispatch*/
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BrevpakkeSelect);
