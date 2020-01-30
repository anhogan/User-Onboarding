import React, { useState, useEffect } from 'react';
import { withFormik, Field, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const UserForm = ({ values, errors, touched, status }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log('Status has changed', status);
    status && setUsers(users => [...users, status])
  }, [status]);

  return (
    <div>
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

        <div>
          <Field name="role" as="select">
            <option disabled>Select Your Role</option>
            <option>Customer Success</option>
            <option>Sales</option>
            <option>Product</option>
            <option>Marketing</option>
            <option>Engineering</option>
            <option>Other</option>
          </Field>
          {touched.role && errors.role ? (<div>{errors.role}</div>) : null}
        </div>

        <label>
          Accept Terms of Service
          <div>
            {touched.tos && errors.tos ? (<div>{errors.tos}</div>) : null}
            <Field name="tos" type="checkbox" checked={values.tos} />
          </div>
        </label>

        <div>
          <button type="submit">Submit</button>
        </div>
      </Form>

      {users.map((user) => (
        <div key={user.id}>
          <h4>{user.name}</h4>
          <p>Email: {user.email}</p>
        </div>
      ))}
    </div>
  )
};

const FormikUserForm = withFormik({
  mapPropsToValues({ name, email, password, tos, role }) {
    return {
      name: name || '',
      email: email || '',
      password: password || '',
      tos: tos || false,
      role: role || ''
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

  handleSubmit(values, { resetForm, setSubmitting, setStatus }) {
    console.log(values);
    axios.post('https://reqres.in/api/users', values)
      .then(response => {
        console.log(response);
        resetForm();
        setSubmitting(false);
        setStatus(response.data);
      })
      .catch(error => {
        console.log(error.message);
        setSubmitting(false);
      });
  }
})(UserForm);

export default FormikUserForm;