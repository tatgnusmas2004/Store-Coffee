// src/Components/Invoice/InvoiceCreate.js
import React from 'react';
import { Create, SimpleForm, TextInput, ArrayInput, SimpleFormIterator, NumberInput } from 'react-admin';

const InvoiceCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="invoTbName" label="Tên Bàn" />
      <ArrayInput source="invoItems">
        <SimpleFormIterator>
          <TextInput source="invoPdName" label="Tên Sản Phẩm" />
          <NumberInput source="invoPdPrice" label="Giá" />
          <NumberInput source="invoQuantity" label="Số Lượng" />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Create>
);

export default InvoiceCreate;
