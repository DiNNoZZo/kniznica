import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '../ui/button';
import Typography from '../ui/typography';
import Input from '../ui/input';
import classes from './form-student.module.scss';

const validationSchema = yup.object({
  name: yup
    .string()
    .min(2, 'Must have 2 or more characters')
    .required('This field is required'),
  email: yup
    .string()
    .email('Please use a valid email.')
    .required('This field is required'),
});

function FormStudent({ handleSubmit, initialValues, type }) {
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      handleSubmit(values);

      formik.resetForm(initialValues);
    },
  });

  return (
    <form
      className={classes.form}
      onSubmit={formik.handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Input
        id="name"
        name="name"
        type="text"
        label="Your full name"
        error={formik.errors.name}
        handleFormikChange={formik.handleChange}
        formikValue={formik.values.name}
      />
      <Input
        id="email"
        name="email"
        type="text"
        label="Your email"
        error={formik.errors.email}
        handleFormikChange={formik.handleChange}
        formikValue={formik.values.email}
      />
      <div className={classes.buttons}>
        <Button type="submit" variant="primary">
          <Typography variant="body1">
            {type === 'POST' ? 'Create' : 'Update'}
          </Typography>
        </Button>
        <Button type="button" onClick={formik.resetForm} variant="default">
          <Typography variant="body1">Reset</Typography>
        </Button>
      </div>
    </form>
  );
}

export default FormStudent;
