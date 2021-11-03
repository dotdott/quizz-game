import axios from "axios";

const url = "https://opentdb.com";

export const api = axios.create({
  baseURL: `${url}`,
});
