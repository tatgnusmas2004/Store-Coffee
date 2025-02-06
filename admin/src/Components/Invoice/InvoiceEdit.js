// src/Components/Invoice/InvoiceEdit.js
import React from 'react';
import { Edit, SimpleForm, TextInput, ArrayInput, SimpleFormIterator, NumberInput } from 'react-admin';

const InvoiceEdit = () => (
  <Edit>
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
  </Edit>
);

export default InvoiceEdit;
