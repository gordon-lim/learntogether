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
import { v4 } from 'uuid';
import DatePicker from 'components/DatePicker';
import { indToDay, periodToHour } from 'containers/CoursePage/utils';

function WithForm({
  isOpen,
  onCreate,
  onClose,
  timings,
  displayName,
  setDisplayName,
  numMeetings,
  setNumMeetings,
  participantLimit,
  setParticipantLimit,
  startDate,
  setStartDate,
}) {
  const onSetDisplayName = e => {
    setDisplayName(e.target.value);
  };
  const onSetNumMeetings = e => {
    setNumMeetings(e.target.value);
  };
  const onSetParticipantLimit = e => {
    setParticipantLimit(e.target.value);
  };
  const onSelectStartDate = date => setStartDate(date);

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
            <Input
              placeholder="Display name"
              value={displayName}
              onChange={onSetDisplayName}
            />
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
                  <Tr key={v4()}>
                    <Td>{indToDay(t.day)}</Td>
                    <Td>{periodToHour(t.period)}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Number of meetings</FormLabel>
            <NumberInput max={50} min={1} defaultValue={numMeetings}>
              <NumberInputField
                value={numMeetings}
                onChange={onSetNumMeetings}
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Participant Limiit</FormLabel>
            <NumberInput max={50} min={1} defaultValue={participantLimit}>
              <NumberInputField
                value={participantLimit}
                onChange={onSetParticipantLimit}
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Meeting Duration</FormLabel>
            <Select placeholder="Select duration" defaultValue={1}>
              <option value={1}>1 hour</option>
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
  displayName: PropTypes.string,
  setDisplayName: PropTypes.func,
  numMeetings: PropTypes.number,
  setNumMeetings: PropTypes.func,
  participantLimit: PropTypes.number,
  setParticipantLimit: PropTypes.func,
  startDate: PropTypes.instanceOf(Date),
  setStartDate: PropTypes.func,
};

export default WithForm;
