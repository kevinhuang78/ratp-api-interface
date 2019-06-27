import * as types from "../actions/lines";

const initialState = {
    linesLoading: false,
    linesError: null,
    line: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        // Get lines
        case types.GET_LINES_REQUESTED:
            return {
                ...state,
                linesLoading: true
            };
        case types.GET_LINES_SUCCESS:
            return {
                ...state,
                linesLoading: false,
                line: action.data
            };
        case types.GET_LINES_FAILURE:
            return {
                ...state,
                linesLoading: false,
                linesError: action.data
            };
        default :
            return state;
    }
}