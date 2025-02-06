import React from 'react';
import { Edit, SimpleForm, TextInput } from 'react-admin';

const ReservationEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source='rsTableName' label="Tên bàn" disabled />
        <TextInput source='rsTime' label='Thời gian' disabled />
        <TextInput source='rsCode' label='Mã đặt bàn' disabled />
        <TextInput source='rsEmail' label='Email' disabled />
      </SimpleForm>
    </Edit>
  );
};

export default ReservationEdit;