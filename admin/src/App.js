import { Admin, Resource, useRefresh } from 'react-admin';
import ProductList from './Components/Products/ProductList';
import ProductEdit from './Components/Products/ProductEdit';
import ProductCreate from './Components/Products/ProductCreate';
import TableList from './Components/TableList/TableList';
import TableEdit from './Components/TableList/TableEdit';
import TableCreate from './Components/TableList/TableCreate';
import combinedProvider from './api/CombineProvider';
import ReservationEdit from './Components/Reservation/ReservationEdit';
import ReservationCreate from './Components/Reservation/ReservationCreate';
import loginProvider from './Components/Login/LoginProvider';
import ReservationList from './Components/Reservation/RevservationList';
import CartList from './Components/CartList/CartList';
import CartEdit from './Components/CartList/CartEdit';
import CartCreate from './Components/CartList/CartCreate';
import ManageTable from './Components/ManageTable/ManageTable';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import TableDetail from './Components/TableList/TableDetail';
import InvoiceList from './Components/Invoice/InvoiceList';
import InvoiceCreate from './Components/Invoice/InvoiceCreate';
import InvoiceEdit from './Components/Invoice/InvoiceEdit';
const App = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload();
      console.log('Refreshing data...');
    }, 60000);

    return () => clearInterval(interval);
  }, []);
  return (
    <Routes>

      {/* Trang chi tiết bàn */}
      <Route path="/table/:tbId" element={<TableDetail />} />

      {/* Tích hợp react-admin */}
      <Route
        path="/*"
        element={
          <Admin
            authProvider={loginProvider}
            dataProvider={combinedProvider}
          >
            <Resource
              name="products"
              list={ProductList}
              edit={ProductEdit}
              create={ProductCreate}
            />
            <Resource
              name="tables"
              list={TableList}
              edit={TableEdit}
              create={TableCreate}
            />
            <Resource
              name="reservations"
              list={ReservationList}
              edit={ReservationEdit}
            />
            <Resource
              name="cartItems"
              list={CartList}
              edit={CartEdit}
            />
            <Resource
              name="invoices"
              list={InvoiceList}
              create={InvoiceCreate}
              edit={InvoiceEdit}
            />
            <Resource
              name='manageTable'
              list={ManageTable}
            />
          </Admin>
        }
      />
    </Routes>
  );
};

export default App;
