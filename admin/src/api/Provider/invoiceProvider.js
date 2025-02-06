// src/api/providers/productProvider.js
import httpClient from '../httpClient';
import config from '../config';

const invoiceProvider = {
  getList: (_, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;

    const query = {
      page: page - 1,
      size: perPage,
      sort: `${field},${order.toLowerCase()}`,
    };

    const url = `${config.INVOICE_URL}/page?${new URLSearchParams(query)}`;

    return httpClient(url).then(({ json }) => ({
      data: json.content.map((item) => ({ id: item.id, ...item })),
      total: json.totalElements,
    }));
  },

  getOne: (_, { id }) =>
    httpClient(`${config.INVOICE_URL}/${id}`).then(({ json }) => ({
      data: { id: json.id, ...json },
    })),

  create: (_, { data }) =>
    httpClient(`${config.INVOICE_URL}/create`, {
      method: 'POST',
      body: JSON.stringify(data),
    }).then(({ json }) => ({ data: { id: json.id, ...json } })),

  update: (_, { id, data }) =>
    httpClient(`${config.INVOICE_URL}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }).then(({ json }) => ({ data: { id, ...json } })),

  delete: (_, { id }) =>
    httpClient(`${config.INVOICE_URL}/${id}`, { method: 'DELETE' }).then(() => ({
      data: { id },
    })),
  deleteMany: (_, { ids }) =>
    Promise.all(
      ids.map((id) =>
        httpClient(`${config.INVOICE_URL}/${id}`, { method: 'DELETE' })
      )
    ).then(() => ({ data: ids })),
};

export default invoiceProvider;