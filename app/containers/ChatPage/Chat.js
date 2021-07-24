import {
  Flex,
  FormControl,
  IconButton,
  Input,
  Stat,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react';
import { makeSelectFirebaseAuth } from 'containers/App/selectors';
import firebase from 'firebase/app';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded, useFirestore } from 'react-redux-firebase';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import ChatBubble from './ChatBubble';
import {
  makeSelectFirestoreCurrentGroup,
  makeSelectFirestoreMessages,
} from './selectors';
import { SendIcon } from './SendIcon';

const Chat = ({ messages, auth, currentGroup, currentGroupId }) => {
  const scroll = useRef(null);
  const [formValue, setFormValue] = useState('');
  const [chatUsers, setChatUsers] = useState([]);
  const firestore = useFirestore();

  const groupRef = firestore.collection('groups').doc(currentGroupId);
  const messageRef = groupRef.collection('messages');

  useState(() => {
    if (isLoaded(currentGroup)) setChatUsers(currentGroup[0].users);
  }, [currentGroupId]);

  const sendMessage = async e => {
    e.preventDefault();
    if (!formValue) return;

    await messageRef.add({
      text: formValue,
      createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
      uid: auth.uid,
    });

    setFormValue('');
    scroll.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Flex px={6} flexDirection="column" flex={1} h="full">
      <Stat my={6}>
        <StatLabel color="gray.500">Chatting in</StatLabel>
        <StatNumber>{currentGroup && currentGroup.name}</StatNumber>
      </Stat>
      <Flex
        overflowY="auto"
        flexDirection="column"
        css={{
          '&::-webkit-scrollbar': {
            width: '0',
          },
          '&::-webkit-scrollbar-track': {
            width: '5px',
          },
        }}
      >
        {messages &&
          messages.map(message => {
            let user = {};
            chatUsers.forEach(chatUser => {
              if (chatUser.id === message.uid) {
                user = chatUser;
              }
            });
            return (
              <ChatBubble
                key={message.id}
                message={message.text}
                dateSent={new Date(message.createdAt.seconds * 1000)}
                from={message.uid === auth.uid ? 'me' : 'others'}
                avatarUrl={user.profileURL}
              />
            );
          })}
      </Flex>
      <div ref={scroll} />
      <FormControl as="form" onSubmit={sendMessage}>
        <Flex>
          <Input
            value={formValue}
            onChange={e => setFormValue(e.target.value)}
          />
          <IconButton
            colorScheme="blue"
            aria-label="Send message"
            variant="ghost"
            type="submit"
            icon={<SendIcon color="gray.900" />}
          />
        </Flex>
      </FormControl>
    </Flex>
  );
};

Chat.propTypes = {
  auth: PropTypes.object,
  messages: PropTypes.array,
  currentGroupId: PropTypes.string,
  currentGroup: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  auth: makeSelectFirebaseAuth(),
  messages: makeSelectFirestoreMessages(),
  currentGroup: makeSelectFirestoreCurrentGroup(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  firestoreConnect(props => [
    {
      collection: 'groups',
      doc: props.currentGroupId,
      subcollections: [{ collection: 'messages' }],
      storeAs: 'message',
      orderBy: 'createdAt',
    },
    {
      collection: 'groups',
      doc: props.currentGroupId,
      storeAs: 'currentGroup',
    },
  ]),
  withConnect,
)(Chat);
