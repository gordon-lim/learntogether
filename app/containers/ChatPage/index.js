/**
 *
 * ChatPage
 *
 */

import {
  Box,
  Container,
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
import React, { memo, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { firestoreConnect, useFirestore } from 'react-redux-firebase';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import ChatBubble from './ChatBubble';
import reducer from './reducer';
import makeSelectChatPage, { makeSelectFirestoreMessages } from './selectors';
import { SendIcon } from './SendIcon';

export function ChatPage({ auth, messages }) {
  useInjectReducer({ key: 'chatPage', reducer });

  const firestore = useFirestore();
  const [formValue, setFormValue] = useState('');
  const scroll = useRef(null);

  const sendMessage = async e => {
    e.preventDefault();
    if (!formValue) return;

    await firestore.collection('messages').add({
      text: formValue,
      createdAt: firestore.FieldValue.serverTimestamp(),
      uid: auth.uid,
    });

    setFormValue('');
    scroll.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <Helmet>
        <title>ChatPage</title>
        <meta name="description" content="Description of ChatPage" />
      </Helmet>
      <Container maxW="8xl">
        <Box
          width={{ lg: '60%' }}
          m="0 auto"
          border="1px"
          p={7}
          borderRadius="lg"
          boxShadow="lg"
          height="100vh"
        >
          <Flex height="100%" flexDirection="column">
            <Flex px={6} overflowY="auto" flexDirection="column" flex={1}>
              <Stat mt={6}>
                <StatLabel color="gray.500">Chatting with</StatLabel>
                <StatNumber>Dina Harrison</StatNumber>
              </Stat>
              {messages &&
                messages.map(message => (
                  <ChatBubble
                    key={message.id}
                    message={message.text}
                    dateSent={new Date(message.createdAt.seconds)}
                    // TODO: change to username?
                    from={message.uid === auth.uid ? 'me' : message.uid}
                  />
                ))}
              <div ref={scroll} />
              {/* TODO: Formik? */}
              <Flex>
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
            </Flex>
          </Flex>
        </Box>
      </Container>
    </div>
  );
}

ChatPage.propTypes = {
  auth: PropTypes.object,
  messages: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  chatPage: makeSelectChatPage(),
  auth: makeSelectFirebaseAuth(),
  messages: makeSelectFirestoreMessages(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  firestoreConnect(props => [
    {
      collection: 'messages',
      // orderBy: 'createdAt',
      limit: 25,
      where: [
        'uid',
        '==',
        'FmVIaefTa5TsbVwFAcs7HWtJDMe2',
        props.firebase.auth().currentUser &&
          props.firebase.auth().currentUser.uid,
      ],
    },
  ]),
  withConnect,
  memo,
)(ChatPage);
