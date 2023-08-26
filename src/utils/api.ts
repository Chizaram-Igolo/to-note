import axios from "axios";
import {
  EmailInviteData,
  FileData,
  LoginValuesPrepared,
  RegisterValuesPrepared,
  Token,
} from "./types";
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

export function logout(token: Token) {
  return axios({
    method: "post",
    url: `${API_URL}user/logout`,
    headers,
    params: token,
  });
}

// Document Upload

export function uploadDocument(data: FileData, token: Token) {
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

export function getDocuments(token: Token) {
  return axios({
    method: "get",
    url: `${API_URL}documents`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${token.token}`,
    },
  });
}

export function getDocument(document_id: string, token: Token) {
  return axios({
    method: "get",
    url: `${API_URL}documents/${document_id}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${token.token}`,
    },
  });
}

// Document Participation

export function addSelfAsParticipant(document_id: string, token: Token) {
  return axios({
    method: "get",
    url: `${API_URL}document-participant-add-self/${document_id}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${token.token}`,
    },
  });
}

export function getDocumentParticipants(token: Token) {
  return axios({
    method: "post",
    url: `${API_URL}document-participants`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${token.token}`,
    },
    data: {},
  });
}

export function sendParticipantEmailInvitation(
  data: EmailInviteData,
  token: Token
) {
  return axios({
    method: "post",
    url: `${API_URL}document-participants-send-email`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${token.token}`,
    },
    data,
  });
}
