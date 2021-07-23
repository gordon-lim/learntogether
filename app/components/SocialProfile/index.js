/**
 *
 * SocialProfile
 *
 */
import {
  Avatar,
  Badge,
  Box,
  Button,
  Center,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { MdCheckCircle, MdSettings } from 'react-icons/md';
import { makeSelectFirebaseAuth } from 'containers/App/selectors';
import PropTypes from 'prop-types';
import React, { memo, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import Profile from '../../images/Profile.svg';
// import styled from 'styled-components';

function SocialProfile({ auth }) {
  const [followed, setFollowed] = useState(false);
  return (
    <Center py={6}>
      <Box
        maxW="320px"
        w="full"
        bg={useColorModeValue('white', 'gray.900')}
        rounded="lg"
        p={6}
        textAlign="center"
      >
        <Avatar
          height="75%"
          width="75%"
          src={auth.photoURL || Profile}
          alt="Avatar Alt"
          mb={4}
          pos="relative"
          _after={{
            content: '""',
            w: 10,
            h: 10,
            bg: 'green.300',
            border: '2px solid white',
            rounded: 'full',
            pos: 'absolute',
            bottom: 0,
            right: 3,
          }}
        />
        <Heading fontSize="2xl" fontFamily="body">
          {auth.displayName}
        </Heading>
        <Text fontWeight={600} color="gray.500" mb={4}>
          @elephant-giraffe1
        </Text>
        <Text
          textAlign="center"
          color={useColorModeValue('gray.700', 'gray.400')}
          px={3}
        >
          Student, programmer and innovator. PM for work inquires or{' '}
          <Link href="/" color="blue.400">
            #tag
          </Link>{' '}
          me in your posts
        </Text>

        <Stack align="center" justify="center" direction="row" mt={6}>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue('gray.50', 'gray.800')}
            fontWeight="400"
          >
            #machinelearning
          </Badge>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue('gray.50', 'gray.800')}
            fontWeight="400"
          >
            #blockchain
          </Badge>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue('gray.50', 'gray.800')}
            fontWeight="400"
          >
            #webdev
          </Badge>
        </Stack>

        <Stack mt={8} direction="row" spacing={4} mb={7}>
          <Button
            flex={1}
            fontSize="sm"
            rounded="full"
            _focus={{
              bg: 'gray.200',
            }}
          >
            Message
          </Button>
          <Button
            onClick={() => setFollowed(true)}
            isDisabled={followed}
            flex={1}
            fontSize="sm"
            rounded="full"
            bg="red.400"
            boxShadow="0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
            _hover={{
              bg: 'red.500',
            }}
            _focus={{
              bg: 'red.500',
            }}
          >
            {followed ? 'Following' : 'Follow'}
          </Button>
        </Stack>
        <List spacing={2}>
          <ListItem>
            <ListIcon as={MdCheckCircle} color="red.500" />
            Courses attended: 8
          </ListItem>
          <ListItem>
            <ListIcon as={MdCheckCircle} color="red.500" />
            Courses joined: 6
          </ListItem>
          <ListItem>
            <ListIcon as={MdCheckCircle} color="red.500" />
            Courses hosted: 2
          </ListItem>
          {/* You can also use custom icons from react-icons */}
          <ListItem>
            <ListIcon as={MdSettings} color="red.500" />
            Course completion rate: 100%
          </ListItem>
        </List>
      </Box>
    </Center>
  );
}

const mapStateToProps = createStructuredSelector({
  auth: makeSelectFirebaseAuth(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
  memo,
)(SocialProfile);

SocialProfile.propTypes = {
  auth: PropTypes.object,
};
