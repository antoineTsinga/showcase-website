import axios from "axios";

export const BACKEND_URL = process.env.REACT_APP_URL || `http://localhost:8086`;

export class APIError extends Error {
  contructor(response) {
    this.response = response;
  }
}

export const backend = axios.create({
  baseURL: `${BACKEND_URL}/api/`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});
