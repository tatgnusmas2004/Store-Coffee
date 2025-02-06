// src/api/httpClient.js
import { fetchUtils } from 'ra-core';

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ 'Content-Type': 'application/json' });
  }
  return fetchUtils.fetchJson(url, options);
};

export default httpClient;
