import React from 'react';
import { Formik, Field, Form } from 'formik';

const UserForm = () => {
  return (
    <Formik
      initialValues={{name: '', email: '', password: '', tos: false, }}
      onSubmit={(values, tools) => {
        console.log(values, tools);
        tools.resetForm();
      }}
      render={props => {
        console.log(props);
        return(
          <Form>
            <Field name="name" type="text" placeholder="Name" />
            <Field name="email" type="email" placeholder="Email" />
            <Field name="password" type="text" placeholder="Password" />
            <Field name="tos" type="checkbox" />
            <input type="submit" />
          </Form>
        )
      }} />
  )
};

export default UserForm;