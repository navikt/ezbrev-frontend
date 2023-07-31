import React, { useState } from 'react';
import { connect } from 'react-redux';
import { CloudFillIcon, CloudSlashFillIcon } from '@navikt/aksel-icons';
import PingInfo from './PingInfo';
import { Popover } from '@navikt/ds-react';

const Ping = ({ error }) => {
    const [anchor, setAnchor] = useState(null);
    const [open, setOpen] = useState(false);

    return (
        <div>
            <button
                className="ping"
                ref={setAnchor}
                onClick={() => setOpen(true)}
                onMouseOver={() => setOpen(true)}
                onFocus={() => setOpen(true)}
                onMouseOut={() => setOpen(false)}
                onBlur={() => setOpen(false)}
            >
                {error ? (
                    <CloudSlashFillIcon className="glyph-fail " />
                ) : (
                    <CloudFillIcon className="glyph-success" />
                )}
            </button>
            <Popover
                id="popover-trigger-hover-focus"
                title="Selftest"
                placement={'bottom'}
                anchorEl={anchor}
                open={open}
                onClose={() => setOpen(false)}
            >
                <Popover.Content>
                    <PingInfo />
                </Popover.Content>
            </Popover>
        </div>
    );
};

function mapStateToProps(state, ownProps) {
    return {
        error: state.ping.error,
    };
}

export default connect(mapStateToProps)(Ping);
