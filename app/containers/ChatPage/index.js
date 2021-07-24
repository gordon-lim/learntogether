/**
 *
 * ChatPage
 *
 */

import { PlusSquareIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import Search from 'components/Search';
import { makeSelectFirebaseAuth } from 'containers/App/selectors';
import PropTypes from 'prop-types';
import React, { memo, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { isEmpty, isLoaded, useFirestore } from 'react-redux-firebase';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import Chat from './Chat';
import reducer from './reducer';
import SideButtons from './SideButtons';

export function ChatPage({ auth }) {
  useInjectReducer({ key: 'chatPage', reducer });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const firestore = useFirestore();
  const [groups, setGroups] = useState([]);
  const [curGroup, setCurGroup] = useState({});

  const groupsRef = firestore.collection('groups');

  // load all groups that user is in
  useEffect(() => {
    if (isLoaded(auth) && !isEmpty(auth)) {
      groupsRef.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const { users, ...rest } = doc.data();

          const matches = users && users.filter(user => user.id === auth.uid);
          if (matches)
            setGroups(prevState => [...prevState, { id: doc.id, ...rest }]);
        });
      });
    }

    setCurGroup(groups[0]);
  }, [auth]);

  // add user to group after searching
  const addFunction = query => {
    const randInt = Math.floor(Math.random() * 9) + 1;

    groupsRef.add({
      imageUrl: `https://cdn2.thecatapi.com/images/5u${randInt}.jpg`,
      name: query,
      users: [
        {
          id: auth.uid,
          profileURL: auth.photoURL,
        },
      ],
    });

    onClose();
  };

  // change user's current group based on id
  const changeCurrentGroup = id => {
    const newGroup = groups.filter(group => group.id === id);
    setCurGroup(newGroup[0]);
  };

  return (
    <div>
      <Helmet>
        <title>ChatPage</title>
        <meta name="description" content="Description of ChatPage" />
      </Helmet>
      <Container maxW="8xl" pt="4em">
        <Box
          width={{ lg: '60%' }}
          m="0 auto"
          border="1px"
          paddingTop={4}
          paddingBottom={10}
          px={8}
          borderRadius="lg"
          boxShadow="lg"
        >
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Search groups and users</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Search Icon={PlusSquareIcon} addFunction={addFunction} />
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <HStack height="100vh">
            <Flex
              as="aside"
              h="full"
              w="full"
              maxW={{ base: 'xs', xl: 'sm' }}
              display={{ base: 'none', lg: 'flex' }}
              flex={0}
            >
              <SideButtons
                groups={groups}
                addChatModal={onOpen}
                changeCurrentGroup={changeCurrentGroup}
              />
            </Flex>
            {curGroup && groups.length !== 0 && (
              <Chat currentGroup={curGroup} />
            )}
          </HStack>
        </Box>
      </Container>
    </div>
  );
}

ChatPage.propTypes = {
  auth: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  auth: makeSelectFirebaseAuth(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
  memo,
)(ChatPage);
