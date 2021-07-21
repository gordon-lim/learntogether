import {
  Avatar,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';
import { useFirebase } from 'react-redux-firebase';
import { Link as RouterLink } from 'react-router-dom';
import Profile from '../../images/Profile.svg';

export const LoggedInItems = ({ photoURL }) => {
  const firebase = useFirebase();

  const logout = async () => {
    await firebase.logout();
  };

  return (
    <Flex alignItems="center" flex={{ base: 1, md: 0 }} justify="flex-end">
      <Menu>
        <MenuButton as={Button} rounded="full" variant="link" cursor="pointer">
          <Avatar size="sm" src={photoURL || Profile} />
        </MenuButton>
        <MenuList>
          <MenuItem as={RouterLink} to="/profile">
            Profile
          </MenuItem>
          <MenuItem as={RouterLink} to="/timetable">
            Timetable
          </MenuItem>
          <MenuDivider />
          <MenuItem onClick={logout}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

LoggedInItems.propTypes = {
  photoURL: PropTypes.string,
};
