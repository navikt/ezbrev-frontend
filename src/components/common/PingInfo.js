import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '~/actions/pingActions';
import { BodyShort, Panel } from '@navikt/ds-react';

const PingInfo = ({ ping, env, actions }) => {
    return (
        <div style={{ color: 'black' }}>
            <BodyShort>
                Miljø: {env} <br />
                Tid: {ping.aggregateResponseTime} <br />
                Status: {ping.aggregateResultText}
            </BodyShort>
            <Panel>
                {ping.checks.map((service) => (
                    <Panel
                        border
                        key={service.endpoint}
                        className={`ping${service.resultText} pingItem`}
                        style={{
                            backgroundColor: service.errorMessage
                                ? 'lightpink'
                                : 'lightgreen',
                        }}
                    >
                        <BodyShort className={'center-vertically'}>
                            <span>{service.endpoint}</span>
                            <span>{service.responseTime}</span>
                        </BodyShort>
                        <BodyShort>
                            <span>{service.errorMessage}</span>
                        </BodyShort>
                    </Panel>
                ))}
            </Panel>
        </div>
    );
};

function mapStateToProps(state, ownProps) {
    return {
        ping: state.ping.ping,
        env: state.ping.env,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PingInfo);
