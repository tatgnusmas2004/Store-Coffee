// src/api/providers/productProvider.js
import httpClient from '../httpClient';
import config from '../config';

const productProvider = {
  getList: (_, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const filters = params.filter || {};

    const query = {
      page: page - 1,
      size: perPage,
      sort: `${field},${order.toLowerCase()}`,
      ...filters,
    };

    const url = `${config.PRODUCTS_URL}/filter?${new URLSearchParams(query)}`;

    return httpClient(url).then(({ json }) => ({
      data: json.content.map((item) => ({ id: item.pdId, ...item })),
      total: json.totalElements,
    }));
  },

  getOne: (_, { id }) =>
    httpClient(`${config.PRODUCTS_URL}/${id}`).then(({ json }) => ({
      data: { id: json.pdId, ...json },
    })),

  create: (_, { data }) =>
    httpClient(config.PRODUCTS_URL, {
      method: 'POST',
      body: JSON.stringify(data),
    }).then(({ json }) => ({ data: { id: json.pdId, ...json } })),

  update: (_, { id, data }) =>
    httpClient(`${config.PRODUCTS_URL}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }).then(({ json }) => ({ data: { id, ...json } })),

  delete: (_, { id }) =>
    httpClient(`${config.PRODUCTS_URL}/${id}`, { method: 'DELETE' }).then(() => ({
      data: { id },
    })),
  deleteMany: (_, { ids }) =>
    Promise.all(
      ids.map((id) =>
        httpClient(`${config.PRODUCTS_URL}/${id}`, { method: 'DELETE' })
      )
    ).then(() => ({ data: ids })),
};

export default productProvider;