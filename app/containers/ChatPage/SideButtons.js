import { PlusSquareIcon } from '@chakra-ui/icons';
import { Avatar, IconButton, Tooltip, VStack } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';

const SideButtons = ({ groups, addChatModal, changeCurrentGroup }) => (
  <VStack
    p={6}
    justifyContent="space-between"
    alignItems="center"
    w="full"
    maxWidth="50px"
  >
    <VStack
      overflowY="auto"
      css={{
        '&::-webkit-scrollbar': {
          width: '0',
        },
        '&::-webkit-scrollbar-track': {
          width: '5px',
        },
      }}
    >
      <Tooltip label="Add Chat" placement="right">
        <IconButton
          color="gray.500"
          icon={<PlusSquareIcon boxSize="25px" />}
          aria-label="Dashboard"
          onClick={addChatModal}
          minHeight="40px"
        />
      </Tooltip>
      {groups &&
        groups.map(group => (
          <Tooltip key={group.id} label={group.name} placement="right">
            <Avatar
              src={group.imageUrl}
              transition="all 0.3s ease"
              _hover={{ cursor: 'pointer', opacity: 0.8 }}
              onClick={() => changeCurrentGroup(group.id)}
            />
          </Tooltip>
        ))}
    </VStack>
  </VStack>
);

SideButtons.propTypes = {
  groups: PropTypes.array,
  addChatModal: PropTypes.func,
  changeCurrentGroup: PropTypes.func,
};

export default SideButtons;
