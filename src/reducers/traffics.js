import * as types from "../actions/traffics";

const initialState = {
    trafficLoading: false,
    trafficError: null,
    traffic: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        // Get traffic
        case types.GET_TRAFFIC_REQUESTED:
            return {
                ...state,
                trafficLoading: true
            };
        case types.GET_TRAFFIC_SUCCESS:
            return {
                ...state,
                trafficLoading: false,
                traffic: action.data
            };
        case types.GET_TRAFFIC_FAILURE:
            return {
                ...state,
                trafficLoading: false,
                trafficError: action.data
            };
        default :
            return state;
    }
}