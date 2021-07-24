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
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { createStructuredSelector } from 'reselect';
import ChatBubble from './ChatBubble';
import { makeSelectFirestoreMessages } from './selectors';
import { SendIcon } from './SendIcon';

const Chat = ({ messages, auth, currentGroup }) => {
  const scroll = useRef(null);
  const [formValue, setFormValue] = useState('');
  const firestore = useFirestore();

  const groupRef = firestore.collection('groups').doc(currentGroup.id); // TODO: Add profile pic
  const messageRef = groupRef.collection('messages');

  useFirestoreConnect([
    {
      collection: 'groups',
      doc: currentGroup.id,
      subcollections: [{ collection: 'messages' }],
      storeAs: 'message',
      orderBy: 'createdAt',
    },
  ]);

  const sendMessage = async e => {
    e.preventDefault();
    if (!formValue) return;

    await messageRef.add({
      text: formValue,
      createdAt: new Date(),
      uid: auth.uid,
    });

    setFormValue('');
    scroll.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Flex px={6} flexDirection="column" flex={1} h="full">
      <Stat my={6}>
        <StatLabel color="gray.500">Chatting in</StatLabel>
        <StatNumber>{currentGroup.name}</StatNumber>
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
          messages.map(message => (
            <ChatBubble
              key={message.id}
              message={message.text}
              dateSent={new Date(message.createdAt.seconds)}
              // TODO: change to username?
              from={message.uid === auth.uid ? 'me' : message.uid}
              avatarUrl={auth.photoURL}
            />
          ))}
      </Flex>
      <div ref={scroll} />
      {/* TODO: Formik? */}
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
  currentGroup: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  auth: makeSelectFirebaseAuth(),
  messages: makeSelectFirestoreMessages(),
});

const withConnect = connect(mapStateToProps);

export default withConnect(Chat);
