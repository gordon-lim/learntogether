/**
 *
 * Modal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@chakra-ui/react';

function WithTimings({ isOpen, onCreate, onClose, timings, RowComponent }) {
  return (
    <Modal
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Available Slots</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Table>
            <Thead>
              <Tr>
                <Th>Start Dates</Th>
              </Tr>
            </Thead>
            <Tbody>
              {timings.map(t => (
                <Tr>
                  <Td>
                    <RowComponent timing={t} />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onCreate}>
            Create
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

WithTimings.propTypes = {
  isOpen: PropTypes.bool,
  onCreate: PropTypes.func,
  onClose: PropTypes.func,
  timings: PropTypes.array,
  RowComponent: PropTypes.func,
};

export default WithTimings;
