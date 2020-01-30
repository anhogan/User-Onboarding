import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validate = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters long")
    .max(15, "Name must be less than 15 charcters long")
    .required("Name is required"),
  email: Yup.string()
    .email("Not a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password must be less than 20 characters long")
    .required("Password is required"),
  tos: Yup.boolean()
    .test('tos', "You have to agree to the Terms of Service", value => value === true)
    .required("You have to agree to the Terms of Service")
});

const UserForm = () => {
  return (
    <Formik
      initialValues={{name: '', email: '', password: '', tos: false, }}
      validationSchema={validate}
      onSubmit={(values, tools) => {
        console.log(values, tools);
        tools.resetForm();
      }}
      render={({errors, touched}) => {
        return(
          <Form>
            <Field name="name" type="text" placeholder="Name" />
            {touched.name && errors.name ? (<div>{errors.name}</div>) : null}
            <ErrorMessage name="name" component="div" className="red" />

            <Field name="email" type="email" placeholder="Email" />
            {touched.email && errors.email ? (<div>{errors.email}</div>) : null}
            <ErrorMessage name="email" component="div" className="red" />
            
            <Field name="password" type="text" placeholder="Password" />
            {touched.password && errors.password ? (<div>{errors.password}</div>) : null}
            <ErrorMessage name="password" component="div" className="red" />

            <Field name="tos" type="checkbox" />
            {touched.tos && errors.tos ? (<div>{errors.tos}</div>) : null}
            <ErrorMessage name="tos" component="div" className="red" />

            <input type="submit" />
          </Form>
        )
      }} />
  )
};

export default UserForm;