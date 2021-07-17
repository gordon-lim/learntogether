import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import { useFirebase } from 'react-redux-firebase';
import { validateEmail } from 'utils/validateEmail';
import { InputField } from './InputField';
import { mapFirebaseErrors } from './mapFirebaseErrors';

const validateFields = ({ email, password, confirmPassword }) => {
  if (!validateEmail(email)) return { email: 'Please enter a valid email' };

  if (password !== confirmPassword)
    return { confirmPassword: 'Passwords do not match' };

  if (password.length < 6)
    return { password: 'Minimum length of 6 for passwords' };

  return null;
};

const SignUpCard = () => {
  const firebase = useFirebase();
  const toast = useToast();

  const googleLogin = async () => {
    await firebase.login({
      provider: 'google',
      type: 'popup',
    });
    toast({
      title: 'Welcome!',
      description: 'We have created an account for you.',
      status: 'success',
      isClosable: true,
    });
  };

  return (
    <Flex
      minH="100vh"
      justify="center"
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl">Sign up for a new account</Heading>
        </Stack>
        <Box
          rounded="lg"
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow="lg"
          p={8}
        >
          <Formik
            initialValues={{ email: '', password: '', confirmPassword: '' }}
            onSubmit={async (values, { setErrors }) => {
              const error = validateFields(values);
              if (error) {
                setErrors(error);
                return;
              }

              try {
                await firebase.createUser({
                  email: values.email,
                  password: values.password,
                });
              } catch (errors) {
                setErrors(mapFirebaseErrors(errors));
              }
              toast({
                title: 'Welcome!',
                description: 'We have created an account for you.',
                status: 'success',
                isClosable: true,
              });
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Stack spacing={4}>
                  <InputField name="email" label="Email" required />
                  <InputField
                    name="password"
                    type="password"
                    label="Password"
                    required
                  />
                  <InputField
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    required
                  />
                  <Stack spacing={3}>
                    <Button
                      bg="blue.400"
                      color="white"
                      _hover={{
                        bg: 'blue.500',
                      }}
                      type="submit"
                      isLoading={isSubmitting}
                    >
                      Sign Up
                    </Button>
                    <Button
                      bg="blue.400"
                      color="white"
                      _hover={{
                        bg: 'blue.500',
                      }}
                      onClick={googleLogin}
                    >
                      Sign Up with Google
                    </Button>
                  </Stack>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </Stack>
    </Flex>
  );
};

export default SignUpCard;
