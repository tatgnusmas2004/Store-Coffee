import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';

const ReservationCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source='rsTableName' label="Tên bàn" />
        <TextInput source='rsTime' label='Thời gian ' />
        <TextInput source='rsCode' label='Mã đặt bàn' />
        <TextInput source='rsEmail' label='Email' />
      </SimpleForm>
    </Create>
  );
};

export default ReservationCreate;