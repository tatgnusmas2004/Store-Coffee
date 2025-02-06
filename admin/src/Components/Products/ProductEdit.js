import React from 'react';
import { Edit, SimpleForm, TextInput, NumberInput } from 'react-admin';

const ProductEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="pdName" label="Name" />
      <TextInput source="pdImgURL" label="Image URL" />
      <NumberInput source="pdPrice" label="Price" />
      <TextInput source="pdType" label="Type" />
      <TextInput source="pdSize" label="Size" />
      <TextInput source="pdDescription" label="Description" />
    </SimpleForm>
  </Edit>
);

export default ProductEdit;
