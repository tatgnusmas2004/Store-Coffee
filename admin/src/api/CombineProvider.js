import productProvider from "./Provider/productProvider";
import tableProvider from "./Provider/tableProvider";
import reservationProvider from "./Provider/reservationProvider";
import cartItemProvider from "./Provider/cartItemProvider";
import invoiceProvider from "./Provider/invoiceProvider";

const pdProvider = productProvider;
const tbProvider = tableProvider;
const rsProvider = reservationProvider;
const cartProvider = cartItemProvider;
const invoProvider = invoiceProvider;

const providersMap = {
  products: pdProvider,
  tables: tbProvider,
  reservations: rsProvider,
  cartItems: cartProvider,
  invoices: invoProvider,
};

const combinedProvider = {
  getList: (resource, params) => {
    const provider = providersMap[resource];
    if (!provider) {
      return Promise.reject(new Error(`Unknown resource: ${resource}`));
    }
    return provider.getList(resource, params);
  },
  getOne: (resource, params) => providersMap[resource]?.getOne(resource, params),
  create: (resource, params) => providersMap[resource]?.create(resource, params),
  update: (resource, params) => providersMap[resource]?.update(resource, params),
  delete: (resource, params) => providersMap[resource]?.delete(resource, params),
  deleteMany: (resource, params) => providersMap[resource]?.deleteMany(resource, params),
};

export default combinedProvider;