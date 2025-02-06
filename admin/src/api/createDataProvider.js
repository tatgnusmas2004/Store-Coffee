// import { fetchUtils } from 'ra-core';

// const httpClient = (url, options = {}) => {
//   if (!options.headers) {
//     options.headers = new Headers({ 'Content-Type': 'application/json' });
//   }
//   return fetchUtils.fetchJson(url, options);
// };

// const createDataProvider = (baseUrl, idField = 'id') => ({
//   getList: (_, params) => {
//     const { page, perPage } = params.pagination;
//     const { field, order } = params.sort;
//     const filters = params.filter || {};

//     const query = {
//       page: page - 1,
//       size: perPage,
//       sort: `${field},${order.toLowerCase()}`,
//       ...filters
//     };

//     const url = `${baseUrl}/page?${new URLSearchParams(query).toString()}`;

//     return httpClient(url).then(({ json }) => ({
//       data: json.content.map((item) => ({ id: item[idField], ...item })),
//       total: json.totalElements,
//     }));
//   },
//   getOne: (_, { id }) =>
//     httpClient(`${baseUrl}/${id}`).then(({ json }) => ({
//       data: { id: json[idField], ...json },
//     })),
//   update: (_, { id, data }) =>
//     httpClient(`${baseUrl}/${id}`, {
//       method: 'PUT',
//       body: JSON.stringify(data),
//     }).then(({ json }) => ({ data: { id, ...json } })),
//   create: (_, { data }) =>
//     httpClient(baseUrl, {
//       method: 'POST',
//       body: JSON.stringify(data),
//     }).then(({ json }) => ({ data: { id: json[idField], ...json } })),
//   delete: (_, { id }) =>
//     httpClient(`${baseUrl}/${id}`, {
//       method: 'DELETE',
//     }).then(() => ({ data: { id } })),
//   deleteMany: (_, { ids }) =>
//     Promise.all(
//       ids.map((id) =>
//         httpClient(`${baseUrl}/${id}`, { method: 'DELETE' })
//       )
//     ).then(() => ({ data: ids })),
// });

// export default createDataProvider;