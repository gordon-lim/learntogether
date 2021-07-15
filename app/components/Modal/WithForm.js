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
  FormControl,
  FormLabel,
  Input,
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
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import DatePicker from 'components/DatePicker';

function WithForm({
  isOpen,
  onCreate,
  onClose,
  timings,
  numMeetings,
  startDate,
  onSelectStartDate,
}) {
  return (
    <Modal
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Schedule a meeting</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Set your display name</FormLabel>
            <Input placeholder="Display name" />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Meeting Timings</FormLabel>
            <Table>
              <Thead>
                <Tr>
                  <Th>Day</Th>
                  <Th>Period</Th>
                </Tr>
              </Thead>
              <Tbody>
                {timings.map(t => (
                  <Tr>
                    <Td>{t.day}</Td>
                    <Td>{t.time}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Number of meetings</FormLabel>
            <NumberInput max={50} min={1} defaultValue={numMeetings}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Meeting Duration</FormLabel>
            <Select placeholder="Select duration" defaultValue={2}>
              <option value={2}>2 hours</option>
            </Select>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Course Start Date</FormLabel>
            <DatePicker
              selected={startDate}
              onChange={onSelectStartDate}
              showPopperArrow
            />
          </FormControl>
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

WithForm.propTypes = {
  isOpen: PropTypes.bool,
  onCreate: PropTypes.func,
  onClose: PropTypes.func,
  timings: PropTypes.array,
  numMeetings: PropTypes.number,
  startDate: PropTypes.instanceOf(Date),
  onSelectStartDate: PropTypes.func,
};

export default WithForm;
