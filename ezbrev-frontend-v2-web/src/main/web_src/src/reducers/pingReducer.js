import * as types from '../actions/actionTypes';

const initialState = {
    ping: { checks: [] }
};

export default function errorReducer(state = initialState, action) {
    switch (
        action.type //tror vi må ha en action til her for når vi legger inn hele brevdata for første gang
    ) {
        case types.SET_PING:
            return { ...state, ping: action.ping };
        default:
            return state;
    }
}
