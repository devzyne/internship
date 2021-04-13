import { ReactIsInDevelomentMode } from "../utils/helper";

const timeout = 20000;

const log = (msg) => {
  if (ReactIsInDevelomentMode) {
    console.log(msg);
  }
};

const handleResponse = (resp, resolve, reject) => {
  switch (resp.status) {
    case 200:
      if (resp.json) {
        resolve(resp.json());
      } else {
        log("service error - 200");
        error(resp, reject);
      }
      break;
    case 400:
      log("Bad Request");
      error(resp, reject);
      break;
    case 403:
      log("Access not granted");
      error(resp, reject);
      window.location.href = "/login?fromPage=loggedOut";
      localStorage.clear();
      break;
    case 503:
      log("Internal server error");
      error(resp, reject);
      break;
    default:
      log("!! Error !!");
      error(resp, reject);
      break;
  }
};

const error = (resp, reject) => {
  if (resp) {
    resp.json().then((res) => reject(res)) ||
      resp.text().then((res) => reject(res));
  } else {
    reject({ err: "Some error occurred, try later." });
  }
};

export const callService = (method, path, config, token) => {
  let method_ = "";
  let body_ = "";

  switch (method) {
    case "get":
    case "authGet":
      method_ = "GET";
      break;
    case "post":
    case "authPost":
      method_ = "POST";
      break;
    case "put":
      method_ = "PUT";
      break;
    case "delete":
      method_ = "DELETE";
      break;
  }
  let header = { "Content-Type": "application/json" };
  if (token) {
    header = { ...header, Authorization: "Bearer " + token };
  }

  if (method_ !== "GET") {
    body_ = JSON.stringify(config);
  } else {
    body_ = null;
    let queryString = Object.keys(config)
      .map((key) => key + "=" + config[key])
      .join("&");
    path = `${path}?${queryString}`;
  }

  const response = new Promise((resolve, reject) => {
    const controller = new AbortController();
    setTimeout(() => {
      controller.abort();
    }, timeout);
    fetch(path, {
      method: method_,
      body: body_,
      headers: header,
      signal: controller.signal,
    })
      .then((res) => {
        handleResponse(res, resolve, reject);
      })
      .catch((err) => {
        let msg = "method : " + method_ + ", ";
        msg = "url : " + path + ", ";
        msg = "header : " + JSON.stringify(header);
        msg = "body : " + JSON.stringify(body_) + ", ";
        msg = "err : " + err;
        log(msg);
        if (err && err.name && err.name === "AbortError") {
          err = "Please check your network and try again";
        }
        const error = { err: err.toString() };
        reject(error);
      });
  });
  return response;
};

//GET HANDLER
export const get = async (basepath, path, config) => {
  path = `${basepath}${path}`;
  return callService("get", path, config);
};

export const authGet = async (basepath, path, config, token) => {
  path = `${basepath}${path}`;
  return callService("authGet", path, config, token);
};

// POST HANDLER
export const post = async (basepath, path, config) => {
  path = `${basepath}${path}`;
  return callService("post", path, config);
};

export const authPost = async (basepath, path, config, token) => {
  path = `${basepath}${path}`;
  return callService("authPost", path, config, token);
};

// PUT HANDLER
export const put = async (basepath, path, config, token) => {
  path = `${basepath}${path}`;
  return callService("put", path, config, token);
};

// DELETE HANDLER
export const DELETE = async (basepath, path, config, token) => {
  path = `${basepath}${path}`;
  return callService("delete", path, config, token);
};

export const downloadFile = async (
  basepath,
  path,
  config,
  downloadFileName,
  token
) => {
  const queryString = Object.keys(config)
    .map((key) => key + "=" + config[key])
    .join("&");
  const response = new Promise((resolve, reject) => {
    fetch(`${basepath}${path}?${queryString}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          res.blob().then((blob) => {
            let blob1 = new Blob([blob], {
              type:
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8",
            });
            let url = window.URL.createObjectURL(blob1);
            let a = document.createElement("a");
            a.href = url;
            a.download = downloadFileName;
            a.click();
            resolve(res);
          });
        } else {
          reject("Some error occurred, try again"); //todo handle cases and verify
        }
      })
      .catch((err) => {
        const error = { err: err }; //todo handle cases and verify
        reject(error);
        log(err);
      });
  });

  return response;
};
