import React from 'react';
import PropTypes from 'prop-types';

export const Space = ({n}) => {
    return (
        <span>
        {[...Array(n)].map((x, i) =>
            <span key={i}>&nbsp;</span>
        )}
        </span>
    );
};

Space.propTypes = {
    n: PropTypes.number
};

Space.defaultProps = {
    n: 2
};
