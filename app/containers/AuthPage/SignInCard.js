import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import { useFirebase } from 'react-redux-firebase';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { InputField } from './InputField';
import { mapFirebaseErrors } from './mapFirebaseErrors';

const validateFields = ({ email }) => {
  if (!email.includes('@')) return { email: 'Please enter a valid email' };
  return null;
};

const SignInCard = () => {
  const history = useHistory();
  const firebase = useFirebase();

  const googleLogin = async () => {
    await firebase.login({
      provider: 'google',
      type: 'popup',
    });
  };

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl">Sign in to your account</Heading>
          <Text fontSize="lg" color="gray.600">
            to enjoy all of our cool{' '}
            <Link color="blue.400" to="/" as={RouterLink}>
              features
            </Link>{' '}
            ✌️
          </Text>
        </Stack>
        <Box
          rounded="lg"
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow="lg"
          p={8}
        >
          <Stack spacing={4}>
            <Formik
              initialValues={{ email: '', password: '', confirmPassword: '' }}
              onSubmit={async (values, { setErrors }) => {
                const error = validateFields(values);
                if (error) {
                  setErrors(error);
                  return;
                }

                try {
                  await firebase.login({
                    email: values.email,
                    password: values.password,
                  });
                } catch (errors) {
                  setErrors(mapFirebaseErrors(errors));
                }
                history.push('/');
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Stack spacing={4}>
                    <InputField name="email" label="Email" />
                    <InputField
                      name="password"
                      type="password"
                      label="Password"
                    />
                    <Stack
                      direction={{ base: 'column', sm: 'row' }}
                      align="start"
                      justify="space-between"
                    >
                      <Checkbox>Remember me</Checkbox>
                      <Link as={RouterLink} color="blue.400" to="/">
                        Forgot password?
                      </Link>
                    </Stack>
                    <Stack>
                      <Button
                        bg="blue.400"
                        color="white"
                        _hover={{
                          bg: 'blue.500',
                        }}
                        type="submit"
                        isLoading={isSubmitting}
                      >
                        Sign in
                      </Button>
                      <Button
                        bg="blue.400"
                        color="white"
                        _hover={{
                          bg: 'blue.500',
                        }}
                        onClick={googleLogin}
                      >
                        Sign in with Google
                      </Button>
                    </Stack>
                  </Stack>
                </Form>
              )}
            </Formik>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default SignInCard;
