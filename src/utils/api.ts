import axios from "axios";
import { LoginValuesPrepared, RegisterValuesPrepared, Token } from "./types";
import { API_URL } from "./constants";

// 99f98a77-b9b1-4597-afbb-04d92530ff89
// 99f98ad2-1ece-490a-8ba7-446db0dd30a6

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json;charset=UTF-8",
};

// Authentication

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

// Document Upload

export function uploadDocument(data, token) {
  return axios({
    method: "post",
    url: `${API_URL}document-upload-convert`,
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token.token}`,
    },
    data,
  });
}

// Document Viewing

export function getDocument(document_id, token) {
  return axios({
    method: "get",
    url: `${API_URL}documents/}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${token.token}`,
    },
  });
}
