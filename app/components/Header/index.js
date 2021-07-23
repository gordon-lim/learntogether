/**
 *
 * Header
 *
 */

import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  Collapse,
  Flex,
  IconButton,
  Spinner,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { makeSelectFirebaseAuth } from 'containers/App/selectors';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { isEmpty, isLoaded } from 'react-redux-firebase';
import { Link as RouterLink } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import ColourModeSwitch from './ColourModeSwitch';
import { DesktopNav } from './DesktopNav';
import { LoggedInItems } from './LoggedInItems';
import { LoggedOutItems } from './LoggedOutItems';
import Logo from './Logo';
import { MobileNav } from './MobileNav';

function Header({ auth }) {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white.800', 'gray.900')}
        color={useColorModeValue('gray.600', 'white')}
        minH="60px"
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle="solid"
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align="center"
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant="ghost"
            aria-label="Toggle Navigation"
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Flex as={RouterLink} to="/" alignItems="center">
            <Logo />
          </Flex>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>
        <ColourModeSwitch mr={3} />
        {!isLoaded(auth) && isEmpty(auth) && <Spinner speed="2s" />}
        {isLoaded(auth) && !isEmpty(auth) ? (
          <LoggedInItems photoURL={auth.photoURL} />
        ) : (
          isLoaded(auth) && <LoggedOutItems />
        )}
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

Header.propTypes = {
  auth: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  auth: makeSelectFirebaseAuth(),
});

const withConnect = connect(mapStateToProps);

export default withConnect(Header);
