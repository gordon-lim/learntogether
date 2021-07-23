/**
 *
 * Footer
 *
 */

// import styled from 'styled-components';
import {
  Box,
  chakra,
  Container,
  IconButton,
  Image,
  Input,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react';
import logo from 'images/Logo.png';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { BiMailSend } from 'react-icons/bi';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

const Logo = () => <Image height="50px" src={logo} alt="logo" />;

const SocialButton = ({ children, label, to }) => (
  <chakra.button
    bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
    rounded="full"
    w={8}
    h={8}
    cursor="pointer"
    as={RouterLink}
    to={to}
    display="inline-flex"
    alignItems="center"
    justifyContent="center"
    transition="background 0.3s ease"
    _hover={{
      bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
    }}
  >
    <VisuallyHidden>{label}</VisuallyHidden>
    {children}
  </chakra.button>
);

const ListHeader = ({ children }) => (
  <Text fontWeight="500" fontSize="lg" mb={2}>
    {children}
  </Text>
);

function Footer() {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      mt={12}
    >
      <Container as={Stack} maxW="8xl" py={10}>
        <SimpleGrid
          templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 2fr' }}
          spacing={8}
        >
          <Stack spacing={6}>
            <Box>
              <Logo color={useColorModeValue('gray.700', 'white')} />
            </Box>
            <Text fontSize="sm">© 2021 LearnTogether. All rights reserved</Text>
            <Stack direction="row" spacing={6}>
              <SocialButton label="Twitter" as={RouterLink} to="/">
                <FaTwitter />
              </SocialButton>
              <SocialButton label="YouTube" as={RouterLink} to="/">
                <FaYoutube />
              </SocialButton>
              <SocialButton label="Instagram" as={RouterLink} to="/">
                <FaInstagram />
              </SocialButton>
            </Stack>
          </Stack>
          <Stack align="flex-start">
            <ListHeader>Courses</ListHeader>
            <Link as={RouterLink} to="/">
              Courses
            </Link>
            <Link as={RouterLink} to="/">
              Blog
            </Link>
            <Link as={RouterLink} to="/">
              Contact us
            </Link>
            <Link as={RouterLink} to="/">
              Pricing
            </Link>
            <Link as={RouterLink} to="/">
              Testimonials
            </Link>
          </Stack>
          <Stack align="flex-start">
            <ListHeader>Support</ListHeader>
            <Link as={RouterLink} to="/">
              Help Center
            </Link>
            <Link as={RouterLink} to="/">
              Terms of Service
            </Link>
            <Link as={RouterLink} to="/">
              Legal
            </Link>
            <Link as={RouterLink} to="/">
              Privacy Policy
            </Link>
            <Link as={RouterLink} to="/">
              Satus
            </Link>
          </Stack>
          <Stack align="flex-start">
            <ListHeader>Stay up to date</ListHeader>
            <Stack direction="row">
              <Input
                placeholder="Your email address"
                bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
                border={0}
                _focus={{
                  bg: 'whiteAlpha.300',
                }}
              />
              <IconButton
                bg={useColorModeValue('green.400', 'green.800')}
                color={useColorModeValue('white', 'gray.800')}
                _hover={{
                  bg: 'green.600',
                }}
                aria-label="Subscribe"
                icon={<BiMailSend />}
              />
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}

Footer.propTypes = {};
SocialButton.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
  to: PropTypes.string,
};
ListHeader.propTypes = {
  children: PropTypes.node,
};

export default memo(Footer);
