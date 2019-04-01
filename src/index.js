import React from "react";
import ReactDOM from "react-dom";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

import "./styles.css";

function MyForm(props) {
  const { values, errors, touched, isSubmitting } = props;

  return (
    <React.Fragment>
      {errors.siya && <h3>{errors.siya}</h3>}
      <Form>
        <ul style={{ color: "orange" }}>
          {touched.password && errors.password && <li>{errors.password}</li>}
          {touched.email && errors.email && <li>{errors.email}</li>}
        </ul>
        <br />
        <label>Enter email: </label>
        <Field type="email" name="email" />
        <br />
        <div>
          <label>Password: </label>
          <Field type="password" name="password" />
        </div>
        <br />
        <label>newsletter</label>
        <Field type="checkbox" name="newsletter" checked={values.newsletter} />
        <Field component="select" name="plan">
          <option value="select option">Package plan</option>
          <option value="premium">Premium</option>
          <option value="Free">Free</option>
        </Field>
        <button type="submit" disabled={isSubmitting}>
          {" "}
          send data
        </button>
      </Form>
    </React.Fragment>
  );
}

const EnhanceForm = withFormik({
  mapPropsToValues: ({ email, password, newsletter, plan }) => ({
    email: email || "",
    password: password || "",
    newsletter: newsletter || true,
    plan: plan || "Free"
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email()
      .required(),
    password: Yup.string()
      .max(2)
      .required()
  }),
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    console.log("values ", values);
    setTimeout(() => {
      if (values.email === "siya@uber5.com") {
        setErrors({ siya: "This person is not allowed here" });
        setSubmitting(false);
        setTimeout(() => {
          setErrors({ siya: null });
          resetForm();
        }, 1000);
      } else {
        resetForm();
      }
    }, 2000);
  }
})(MyForm);

const rootElement = document.getElementById("root");
ReactDOM.render(<EnhanceForm />, rootElement);
