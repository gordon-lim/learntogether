import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useFirebase } from 'react-redux-firebase';
import { InputField } from './InputField';

const mapFirebaseErrors = ({ code, message }) => {
  if (code === 'auth/invalid-email') return { email: message };
  return null;
};

const ForgetPasswordCard = () => {
  const firebase = useFirebase();
  const [helperText, setHelperText] = useState('');

  return (
    <Flex
      minH="100vh"
      justify="center"
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl">Sign in to your account</Heading>
        </Stack>
        <Box
          rounded="lg"
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow="lg"
          p={8}
        >
          <Formik
            initialValues={{ email: '' }}
            onSubmit={async (values, { setErrors }) => {
              try {
                await firebase.resetPassword(values.email);
              } catch (errors) {
                setErrors(mapFirebaseErrors(errors));
                if (errors.code !== 'auth/user-not-found') return;
              }
              setHelperText(
                'If your email exists, an email to reset your password has been sent to your email',
              );
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Stack spacing={4}>
                  <InputField
                    name="email"
                    label="Email"
                    required
                    helperText={helperText}
                  />
                  <Button
                    bg="blue.400"
                    color="white"
                    _hover={{
                      bg: 'blue.500',
                    }}
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    Reset password
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </Stack>
    </Flex>
  );
};

export default ForgetPasswordCard;
