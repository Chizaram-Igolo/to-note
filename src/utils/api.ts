import axios from "axios";
import { LoginValuesPrepared, RegisterValuesPrepared, Token } from "./types";
import { API_URL } from "./constants";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json;charset=UTF-8",
};

export function register(data: RegisterValuesPrepared) {
  return axios({
    method: "post",
    url: `${API_URL}user/register`,
    headers,
    data,
  });
}

export function login(data: LoginValuesPrepared) {
  return axios({
    method: "post",
    url: `${API_URL}user/login`,
    headers,
    data,
  });
}

export function getProfile(token: Token) {
  return axios({
    method: "get",
    url: `${API_URL}user/profile`,
    headers,
    params: token,
  });
}

export function uploadDocument(data, token) {
  return axios({
    method: "post",
    url: `${API_URL}document-upload-convert`,
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
    data,
    params: token,
  });
}
