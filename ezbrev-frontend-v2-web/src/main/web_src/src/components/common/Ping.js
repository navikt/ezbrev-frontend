import React from 'react';
import {Glyphicon, OverlayTrigger, Popover} from 'react-bootstrap';
import {connect} from 'react-redux';
import PingInfo from "./PingInfo";

class Ping extends React.Component {
    popoverClick = () => {
        return (
            <Popover id="popover-trigger-hover-focus" title="Selftest">
                <PingInfo />
            </Popover>
        );
    };
    pingIcon=()=>{
        if (this.props.error){
            return(
                <Glyphicon glyph="glyphicon glyphicon-remove" className="glyph-fail "/>
            )
        }else{
            return(
                <Glyphicon glyph="glyphicon glyphicon-ok" className="glyph-success"/>
            )
        }
    }
    render() {
        return (
            <OverlayTrigger
                trigger={['hover', 'focus']}
                placement="bottom"
                overlay={this.popoverClick()}
            >
                <div>

                    <a className="ping">
                        {this.pingIcon()}
                    </a>
                </div>
            </OverlayTrigger>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        error: state.ping.error
    };
}

export default connect(mapStateToProps)(Ping);
