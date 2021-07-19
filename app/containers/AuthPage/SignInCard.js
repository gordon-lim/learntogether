import {
  Box,
  Button,
  Center,
  Text,
  Checkbox,
  Flex,
  Heading,
  Link,
  Stack,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { Form, Formik } from 'formik';
import React from 'react';
import { useFirebase } from 'react-redux-firebase';
import { Link as RouterLink } from 'react-router-dom';
import { InputField } from './InputField';
import { mapFirebaseErrors } from './mapFirebaseErrors';
import { validateEmail } from './utils';

const validateFields = ({ email }) => {
  if (!validateEmail(email)) return { email: 'Please enter a valid email' };
  return null;
};

const SignInCard = () => {
  const firebase = useFirebase();
  const toast = useToast();

  const googleLogin = async () => {
    await firebase.login({
      provider: 'google',
      type: 'popup',
    });
    toast({
      title: 'Welcome back!',
      description: 'You are now logged in.',
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
          <Heading fontSize="4xl">Sign in to your account</Heading>
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
                await firebase.login({
                  email: values.email,
                  password: values.password,
                });
              } catch (errors) {
                setErrors(mapFirebaseErrors(errors));
              }
              toast({
                title: 'Welcome back!',
                description: 'You are now logged in.',
                status: 'success',
                isClosable: true,
              });
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
                    <Link
                      as={RouterLink}
                      color="blue.400"
                      to="/auth/forget-password"
                    >
                      Forgot password?
                    </Link>
                  </Stack>
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
                      Sign in
                    </Button>

                    <Button
                      onClick={googleLogin}
                      w="full"
                      maxW="md"
                      variant="outline"
                      leftIcon={<FcGoogle />}
                    >
                      <Center>
                        <Text>Sign in with Google</Text>
                      </Center>
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

export default SignInCard;
