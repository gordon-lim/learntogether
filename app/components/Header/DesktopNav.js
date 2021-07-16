import { SearchIcon } from '@chakra-ui/icons';
import {
  Center,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { DesktopSubNav } from './DesktopSubNav';
import { NAV_ITEMS } from './NAV_ITEMS';

export const DesktopNav = () => {
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
                as={RouterLink}
                p={2}
                to={navItem.href ?? '#'}
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
