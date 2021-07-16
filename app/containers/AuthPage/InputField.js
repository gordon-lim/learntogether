import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/form-control';
import { FormHelperText, Input } from '@chakra-ui/react';
import { useField } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';

export const InputField = ({ label, helperText, ...props }) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input {...field} {...props} id={field.name} />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

InputField.propTypes = {
  label: PropTypes.string,
  helperText: PropTypes.string,
};
