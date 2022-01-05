import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '../ui/button';
import Typography from '../ui/typography';
import Input from '../ui/input';
import classes from './form-book.module.scss';

const validationSchema = yup.object({
  name: yup
    .string()
    .min(2, 'Must have 2 or more characters')
    .required('This field is required'),
  writer: yup
    .string()
    .min(2, 'Must have 2 or more characters')
    .required('This field is required'),
  pages: yup
    .number()
    .positive('Number must by positive.')
    .nullable(true)
    .transform((v) => (v === '' ? null : v))
    .required('This field is required'),
});

function FormBook({ handleSubmit, initialValues, type }) {
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
        id="writer"
        name="writer"
        type="text"
        label="Author's name."
        error={formik.errors.writer}
        handleFormikChange={formik.handleChange}
        formikValue={formik.values.writer}
      />
      <Input
        id="name"
        name="name"
        type="text"
        label="Name of the book"
        error={formik.errors.name}
        handleFormikChange={formik.handleChange}
        formikValue={formik.values.name}
      />
      <Input
        id="pages"
        name="pages"
        type="number"
        label="Number of pages"
        error={formik.errors.pages}
        handleFormikChange={formik.handleChange}
        formikValue={formik.values.pages}
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

export default FormBook;
