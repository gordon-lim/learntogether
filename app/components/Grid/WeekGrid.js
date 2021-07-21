/**
 *
 * WeekGrid View for choosing the timings for the courses
 *
 */

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
import PropTypes from 'prop-types';
import React from 'react';
// import { connect } from 'react-redux';
import { v4 } from 'uuid';

// import WeekGridItem from './WeekGridItem';

export function WeekGrid({
  slotItems,
  periodLen,
  numPeriodsPerDay,
  scrollable,
  ...props
}) {
  const numDays = 7;

  return (
    <Box height={scrollable && '500px'} overflowY={scrollable && 'auto'}>
      <Table variant="simple" {...props}>
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
            <Tr key={v4()}>
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
                <Td key={v4()} padding="0px">
                  {slotItems[day][period]}
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

WeekGrid.propTypes = {
  slotItems: PropTypes.array.isRequired,
  periodLen: PropTypes.number.isRequired,
  numPeriodsPerDay: PropTypes.number.isRequired,
  scrollable: PropTypes.bool,
};
