/**
 *
 * WeekGrid View for choosing the timings for the courses
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import { uuid } from 'uuidv4';
import {
  Box,
  Center,
  Table,
  TableCaption,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

import WeekGridItem from './WeekGridItem';

export function WeekGrid() {
  const numDays = 7;
  const periodLen = 0.5; // Sample

  // TODO: Find out the duration of each period of the course, eg 0.5, 1, 1.5, 2, 3
  const numPeriodsPerDay = Math.floor(24 / periodLen);

  // TODO: get data about the available timings for the course
  const slots = [
    new Array(numPeriodsPerDay).fill(0),
    new Array(numPeriodsPerDay).fill(1),
    new Array(numPeriodsPerDay).fill(2),
    new Array(numPeriodsPerDay).fill(3),
    new Array(numPeriodsPerDay).fill(4),
    new Array(numPeriodsPerDay).fill(5),
    new Array(numPeriodsPerDay).fill(6),
  ];

  return (
    <Box>
      <Table variant="simple">
        <TableCaption placement="top">Course Timings</TableCaption>
        <Thead>
          <Tr>
            <Th />
            <Th>
              <Center>Sun</Center>
            </Th>
            <Th>
              <Center>Mon</Center>
            </Th>
            <Th>
              <Center>Tue</Center>
            </Th>
            <Th>
              <Center>Wed</Center>
            </Th>
            <Th>
              <Center>Thu</Center>
            </Th>
            <Th>
              <Center>Fri</Center>
            </Th>
            <Th>
              <Center>Sat</Center>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {[...Array(numPeriodsPerDay).keys()].map(period => (
            <Tr key={uuid()}>
              <Td padding="0px">
                <Center
                  fontWeight="bold"
                  borderRight="1px"
                  borderColor="gray.500"
                >
                  {periodToHour(period, periodLen)}
                </Center>
              </Td>
              {[...Array(numDays).keys()].map(day => (
                <Td key={uuid()} padding="0px">
                  <WeekGridItem numSlots={slots[day][period]} />
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
        <Tfoot />
      </Table>
    </Box>
  );
}

function periodToHour(period, periodLen) {
  const timeMins = period * periodLen * 60;
  const hour = String(Math.floor(timeMins / 60)).padStart(2, '0');
  const mins = String(timeMins % 60).padStart(2, '0');
  return hour + mins;
}

WeekGrid.propTypes = {};
