import {
  ADD_CHIPS,
  DELETE_CHIPS,
  TOGGLE_FILTER,
  TOGGLE_SETTINGS,
  LOGIN,
  LOGOUT,
  ADD_FROM_PAGE,
  CLEAR_CHIPS,
  TOGGLE_RATE_WORKER_WARNING,
  SET_ERROR,
  ADD_RATE_WORKER_TIME,
  ADD_RATE_WORKER_LIST,
} from "../actionTypes";

const initialState = {
  chips: [],
  toggleFilter: false,
  settings: false,
  isAuthenticated: false,
  fromPage: "",
  error: "",
  rateWorkerWarning: true,
  rateWorkerData: {
    list: [],
    time: "",
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_CHIPS:
      return {
        ...state,
        chips: [...state.chips, action.payload],
      };
    case DELETE_CHIPS:
      if (state.chips.length === 1) {
        return {
          ...state,
          chips: [],
        };
      } else {
        return {
          ...state,
          chips: state.chips.filter((i) => i !== action.payload),
        };
      }

    case CLEAR_CHIPS:
      return {
        ...state,
        chips: [],
      };

    case TOGGLE_FILTER:
      return {
        ...state,
        toggleFilter: !state.toggleFilter,
      };

    case TOGGLE_SETTINGS:
      return {
        ...state,
        settings: !state.settings,
      };

    case ADD_FROM_PAGE:
      return {
        ...state,
        fromPage: action.payload,
      };

    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
      };

    case LOGOUT:
      return initialState;

    case TOGGLE_RATE_WORKER_WARNING:
      return {
        ...state,
        rateWorkerWarning: action.payload,
      };

    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_RATE_WORKER_LIST:
      return {
        ...state,
        rateWorkerData: {
          ...state.rateWorkerData,
          list: action.payload,
        },
      };

    case ADD_RATE_WORKER_TIME:
      return {
        ...state,
        rateWorkerData: {
          ...state.rateWorkerData,
          time: action.payload,
        },
      };
    default:
      return state;
  }
}
