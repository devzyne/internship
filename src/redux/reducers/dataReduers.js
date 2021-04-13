import {
  GET_SUGGESTIONS,
  GET_INDUSTRIES,
  GET_TECHNOLOGIES,
  ADD_INDUSTRIES,
  ADD_TECHNOLOGIES,
  ADD_JOB_DESCRIPTION,
  LOGOUT,
  ADD_GWPROF_EDUCATION,
  ADD_GWPROF_PROJECT,
  ADD_GWPROF_SOCIAL,
  ADD_GWPROF_CERTIFICATE,
  ADD_GWPROF_ROLE,
  ADD_GWPROF_TECHNOLOGIES,
  ADD_GWPROF_INDUSTRIES,
  CLEAR_JOB,
  ADD_ALL_TECHNOLOGY,
  CLEAR_PROFILE,
} from "../actionTypes";

const initialState = {
  autoSuggest: [],
  industries: [],
  technologies: [],
  allTechList: [],
  job: {
    industries: [],
    technologies: [],
    jobData: {},
  },
  rateWorkerList: [],
  profile: {
    industries: [],
    technologies: [],
    education: [],
    projects: [],
    social: [],
    certificate: [],
    role: [],
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SUGGESTIONS:
      return {
        ...state,
        autoSuggest: action.payload,
      };

    case GET_TECHNOLOGIES:
      return {
        ...state,
        technologies: action.payload,
      };

    case GET_INDUSTRIES:
      return {
        ...state,
        industries: action.payload,
      };

    case ADD_INDUSTRIES:
      return {
        ...state,
        job: {
          ...state.job,
          industries: action.payload,
        },
      };

    case ADD_TECHNOLOGIES:
      return {
        ...state,
        job: {
          ...state.job,
          technologies: action.payload,
        },
      };

    case ADD_JOB_DESCRIPTION:
      return {
        ...state,
        job: {
          ...state.job,
          jobData: action.payload,
        },
      };

    case ADD_GWPROF_EDUCATION:
      return {
        ...state,
        profile: {
          ...state.profile,
          education: action.payload,
        },
      };

    case ADD_GWPROF_PROJECT:
      return {
        ...state,
        profile: {
          ...state.profile,
          projects: action.payload,
        },
      };

    case ADD_GWPROF_SOCIAL:
      return {
        ...state,
        profile: {
          ...state.profile,
          social: action.payload,
        },
      };

    case ADD_GWPROF_CERTIFICATE:
      return {
        ...state,
        profile: {
          ...state.profile,
          certificate: action.payload,
        },
      };

    case ADD_GWPROF_ROLE:
      return {
        ...state,
        profile: {
          ...state.profile,
          role: action.payload,
        },
      };

    case ADD_GWPROF_INDUSTRIES:
      return {
        ...state,
        profile: {
          ...state.profile,
          industries: action.payload,
        },
      };

    case CLEAR_PROFILE:
      return {
        ...state,
        profile: {
          industries: [],
          technologies: [],
          education: [],
          projects: [],
          social: [],
          certificate: [],
          role: [],
        },
      };

    case ADD_GWPROF_TECHNOLOGIES:
      return {
        ...state,
        profile: {
          ...state.profile,
          technologies: action.payload,
        },
      };
    case LOGOUT:
      return initialState;

    case CLEAR_JOB:
      return {
        ...state,
        job: {
          industries: [],
          technologies: [],
          jobData: {},
        },
      };

    case ADD_ALL_TECHNOLOGY:
      return {
        ...state,
        allTechList: action.payload,
      };

    default:
      return state;
  }
}
