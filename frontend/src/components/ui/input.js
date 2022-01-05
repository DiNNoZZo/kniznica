import React from 'react';
import Typography from './typography';
import classes from './input.module.scss';

function Input({
  id,
  name,
  label,
  type,
  error,
  handleFormikChange,
  formikValue,
  ...otherProps
}) {
  return (
    <div className={classes.input}>
      <label htmlFor={name}>
        <Typography variant="body2">{label}</Typography>
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={formikValue}
        onChange={handleFormikChange}
        className={error ? classes.error : null}
        {...otherProps}
      />
      <div className={classes.error_area}>
        <Typography variant="error">{error}</Typography>
      </div>
    </div>
  );
}

export default Input;
