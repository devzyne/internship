import {
  GET_SUGGESTIONS,
  GET_INDUSTRIES,
  GET_TECHNOLOGIES,
  ADD_TECHNOLOGIES,
  ADD_INDUSTRIES,
  ADD_JOB_DESCRIPTION,
  ADD_GWPROF_INDUSTRIES,
  ADD_GWPROF_TECHNOLOGIES,
  ADD_GWPROF_EDUCATION,
  ADD_GWPROF_PROJECT,
  ADD_GWPROF_CERTIFICATE,
  ADD_GWPROF_SOCIAL,
  ADD_GWPROF_ROLE,
  CLEAR_JOB,
  CLEAR_PROFILE,
  ADD_ALL_TECHNOLOGY,
} from "../actionTypes";

import { get } from "../../api/api";
import { BasePath } from "../../globals/serviceURLs";

export const getSuggestions = (value) => (dispatch) => {
  const userData = JSON.parse(localStorage.UserData);
  const caid = userData.cat;
  const path = "/gsrch/by";
  const config = {
    caid: caid,
    cont: value,
    cnt: 10,
  };
  get(BasePath, path, config)
    .then((res) => {
      dispatch({
        type: GET_SUGGESTIONS,
        payload: res,
      });
    })
    .catch((e) => {
      console.log(e);
    });
};

export const getIndustries = () => (dispatch) => {
  const path = "/gsrch/ist";
  const config = {
    caid: 2,
  };

  get(BasePath, path, config)
    .then((res) => {
      const data = res.map((item) => {
        return { nme: item.nme, isid: item.isid, pth: item.pth };
      });
      dispatch({
        type: GET_INDUSTRIES,
        payload: data,
      });
    })
    .catch((e) => {
      console.log(e);
    });
};

export const getTechnologies = () => (disptach) => {
  const path = "/gsrch/ist";
  const config = {
    caid: 2,
  };

  get(BasePath, path, config)
    .then((res) => {
      const dataMultiDim = res.map((item) => {
        return item.tech.map((tech) => {
          return tech;
        });
      });
      const data = [].concat.apply([], dataMultiDim);
      disptach({
        type: GET_TECHNOLOGIES,
        payload: data,
      });
    })
    .catch((e) => {
      console.log(e);
    });
};
export const addIndustries = (industries) => (dispatch) => {
  dispatch({
    type: ADD_INDUSTRIES,
    payload: industries,
  });
};

export const addTechnologies = (technologies) => (dispatch) => {
  dispatch({
    type: ADD_TECHNOLOGIES,
    payload: technologies,
  });
};

export const addJobDescription = (description) => (dispatch) => {
  dispatch({
    type: ADD_JOB_DESCRIPTION,
    payload: description,
  });
};

export const addGWProfEducation = (education) => (dispatch) => {
  dispatch({
    type: ADD_GWPROF_EDUCATION,
    payload: education,
  });
};

export const addGWProfProject = (project) => (dispatch) => {
  dispatch({
    type: ADD_GWPROF_PROJECT,
    payload: project,
  });
};

export const addGWProfCertificate = (certificate) => (dispatch) => {
  dispatch({
    type: ADD_GWPROF_CERTIFICATE,
    payload: certificate,
  });
};

export const addGWProfSocial = (social) => (dispatch) => {
  dispatch({
    type: ADD_GWPROF_SOCIAL,
    payload: social,
  });
};

export const addGWProfRole = (role) => (dispatch) => {
  dispatch({
    type: ADD_GWPROF_ROLE,
    payload: role,
  });
};

export const addGWProfIndustries = (industries) => (dispatch) => {
  dispatch({
    type: ADD_GWPROF_INDUSTRIES,
    payload: industries,
  });
};

export const addGWProfTechnologies = (technologies) => (dispatch) => {
  dispatch({
    type: ADD_GWPROF_TECHNOLOGIES,
    payload: technologies,
  });
};

export const clearJob = () => (dispatch) => {
  dispatch({
    type: CLEAR_JOB,
  });
};

export const addAllTechnology = (tech) => (dispatch) => {
  dispatch({
    type: ADD_ALL_TECHNOLOGY,
    payload: tech,
  });
};

export const clearProfile = () => (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE,
  });
};
