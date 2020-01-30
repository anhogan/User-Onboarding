import React, { useState } from 'react';
import { withFormik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const UserForm = ({values, errors, touched}) => {
  const [users, setUsers] = useState([]);

  return (
    <Form>
      <div>
      <Field name="name" type="text" placeholder="Name" />
      {touched.name && errors.name ? (<div>{errors.name}</div>) : null}
      </div>

      <div>
      <Field name="email" type="email" placeholder="Email" />
      {touched.email && errors.email ? (<div>{errors.email}</div>) : null}
      </div>
      
      <div>
      <Field name="password" type="password" placeholder="Password" />
      {touched.password && errors.password ? (<div>{errors.password}</div>) : null}
      </div>

      <label>
        Accept Terms of Service
      <Field name="tos" type="checkbox" checked={values.tos} />
      {touched.tos && errors.tos ? (<div>{errors.tos}</div>) : null}
      </label>

      <button>Submit</button>
    </Form>
  )
};

const FormikUserForm = withFormik({
  mapPropsToValues({name, email, password, tos}) {
    return {
      name: name || '',
      email: email || '',
      password: password || '',
      tos: tos || false
    }
  },

  validationSchema: Yup.object().shape({
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
  }),

  handleSubmit(values, {resetForm, setSubmitting}) {
    console.log(values);
    axios.post('https://reqres.in/api/users', values)
      .then(response => {
        console.log(response);
        resetForm();
        setSubmitting(false);
      })
      .catch(error => {
        console.log(error.message);
        setSubmitting(false);
      });
  }
})(UserForm);

export default FormikUserForm;