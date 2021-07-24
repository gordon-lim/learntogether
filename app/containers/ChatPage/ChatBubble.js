import { Avatar, Box, Flex, Text, VStack } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';

const ChatBubble = ({ message, dateSent, from, avatarUrl }) => {
  const isMe = from === 'me';
  const alignment = isMe ? 'flex-end' : 'flex-start';
  const bottomRightRadius = isMe ? 0 : 32;
  const bottomLeftRadius = isMe ? 32 : 0;

  const hours = dateSent && dateSent.getUTCHours();
  const minutes = dateSent && dateSent.getMinutes();

  return (
    <VStack alignItems={alignment} alignSelf={alignment}>
      <Flex alignItems="flex-end" flexFlow={!isMe && 'row-reverse'}>
        <Box
          bg={isMe ? 'blue.50' : 'gray.100'}
          px={6}
          py={4}
          mr={isMe && 2}
          ml={!isMe && 2}
          maxW={80}
          borderTopLeftRadius={32}
          borderTopRightRadius={32}
          borderBottomLeftRadius={bottomLeftRadius}
          borderBottomRightRadius={bottomRightRadius}
        >
          {message}
        </Box>
        <Avatar src={avatarUrl} size="sm" />
      </Flex>
      <Text fontSize="xs" color="gray">
        {hours}:{minutes}
        {hours > 12 ? 'PM' : 'AM'}
      </Text>
    </VStack>
  );
};

ChatBubble.propTypes = {
  message: PropTypes.string,
  dateSent: PropTypes.instanceOf(Date),
  from: PropTypes.string,
  avatarUrl: PropTypes.string,
};

export default ChatBubble;
