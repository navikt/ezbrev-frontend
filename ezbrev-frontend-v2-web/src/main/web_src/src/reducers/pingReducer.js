import * as types from '../actions/actionTypes';

const initialState = {
    ping: { checks: [], aggregateResponseTime:"Kunne ikke beregne" },
    env:"Ikke satt"
};

export default function errorReducer(state = initialState, action) {
    switch (
        action.type
    ) {
        case types.SET_PING:
            return { ...state, ping: action.ping, env: action.env };
        default:
            return state;
    }
}
