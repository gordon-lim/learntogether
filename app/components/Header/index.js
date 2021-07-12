/**
 *
 * Header
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import {
  Box,
  Flex,
  Text,
  Image,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Input,
  Link,
  Center,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  SearchIcon,
} from '@chakra-ui/icons';
import logo from 'images/logo.png';

function Header() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
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
          <Link href="/#">
            <Image height="50px" src={logo} alt="logo" />
          </Link>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>
        <LoggedOutItems />
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  return (
    <Stack direction="row" spacing={4}>
      {NAV_ITEMS.map(navItem => (
        <Center key={navItem.label}>
          <Popover trigger="hover" placement="bottom-start">
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? '#'}
                fontSize="sm"
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow="xl"
                bg={popoverContentBgColor}
                p={4}
                rounded="xl"
                minW="sm"
              >
                <Stack>
                  {navItem.children.map(child => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Center>
      ))}
      <Center>
        <InputGroup>
          <Input placeholder="Search course, user..." />
          <InputRightElement>
            <IconButton aria-label="Search database" icon={<SearchIcon />} />
          </InputRightElement>
        </InputGroup>
      </Center>
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => (
  <Link
    href={href}
    role="group"
    display="block"
    p={2}
    rounded="md"
    _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}
  >
    <Stack direction="row" align="center">
      <Box>
        <Text
          transition="all .3s ease"
          _groupHover={{ color: 'pink.400' }}
          fontWeight={500}
        >
          {label}
        </Text>
        <Text fontSize="sm">{subLabel}</Text>
      </Box>
      <Flex
        transition="all .3s ease"
        transform="translateX(-10px)"
        opacity={0}
        _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
        justify="flex-end"
        align="center"
        flex={1}
      >
        <Icon color="pink.400" w={5} h={5} as={ChevronRightIcon} />
      </Flex>
    </Stack>
  </Link>
);

const MobileNav = () => (
  <Stack
    bg={useColorModeValue('white', 'gray.800')}
    p={4}
    display={{ md: 'none' }}
  >
    {NAV_ITEMS.map(navItem => (
      <MobileNavItem key={navItem.label} {...navItem} />
    ))}
  </Stack>
);

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? '#'}
        justify="space-between"
        align="center"
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition="all .25s ease-in-out"
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle="solid"
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align="start"
        >
          {children &&
            children.map(child => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const LoggedOutItems = () => (
  <Stack
    flex={{ base: 1, md: 0 }}
    justify="flex-end"
    direction="row"
    spacing={6}
  >
    <Button
      as="a"
      fontSize="sm"
      fontWeight={400}
      variant="link"
      href="/auth/signin"
    >
      Sign In
    </Button>
    <Button
      as="a"
      display={{ base: 'none', md: 'inline-flex' }}
      fontSize="sm"
      fontWeight={600}
      color="white"
      bg="pink.400"
      href="/auth/signup"
      _hover={{
        bg: 'pink.300',
      }}
    >
      Sign Up
    </Button>
  </Stack>
);
/* eslint-disable-next-line */
const LoggedInItems = () => (
  <Flex alignItems="center" flex={{ base: 1, md: 0 }} justify="flex-end">
    <Menu>
      <MenuButton as={Button} rounded="full" variant="link" cursor="pointer">
        <Avatar
          size="sm"
          src="https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
        />
      </MenuButton>
      <MenuList>
        <MenuItem>Profile</MenuItem>
        <MenuItem>Timetable</MenuItem>
        <MenuDivider />
        <MenuItem>Logout</MenuItem>
      </MenuList>
    </Menu>
  </Flex>
);
const NAV_ITEMS = [
  {
    label: 'Categories',
    children: [
      {
        label: 'Psychology',
        href: '#',
      },
      {
        label: 'Web development',
        href: '#',
      },
    ],
  },
];

Header.propTypes = {};
DesktopSubNav.propTypes = {
  label: PropTypes.string,
  href: PropTypes.string,
  subLabel: PropTypes.string,
};
MobileNavItem.propTypes = {
  label: PropTypes.string,
  children: PropTypes.any,
  href: PropTypes.string,
};

export default Header;
