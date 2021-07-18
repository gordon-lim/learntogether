/**
 *
 * Host Course Page
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Center,
  Container,
  Heading,
  useDisclosure,
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import WithForm from 'components/Modal/WithForm';
import makeSelectCoursePage, { makeSelectSlots } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { slotsToGridItem } from './utils';
import { selectJoinSlot } from './actions';
import { WeekGrid } from '../../components/Grid/WeekGrid';
import HostWeekGridItem from '../../components/TableComponent/HostWeekGridItem';

function HostCourse(props) {
  useInjectReducer({ key: 'coursePage', reducer });
  useInjectSaga({ key: 'coursePage', saga });

  const { courseId } = props.match.params; //eslint-disable-line
  const { slots } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [startDate, setStartDate] = useState(new Date());

  const onSelectStartDate = date => setStartDate(date);
  const onCreateMeeting = () => null;

  // TODO: check if the user has an access token
  // TODO: check if the access token is still valid
  // TODO: if no access token redirect to oauth to get one

  const periodLen = 2; // Sample
  // TODO: Find out the duration of each period of the course, eg 0.5, 1, 1.5, 2, 3
  const numPeriodsPerDay = Math.floor(24 / periodLen);
  // TODO: get data about the available timings for the course
  const sumVotes = slots
    .reduce((a, b) => a.concat(b))
    .reduce((acc, obj) => acc + obj.numSlots, 0);
  const aveVotes = Math.floor(sumVotes / (numPeriodsPerDay * 7));
  const slotItems = slotsToGridItem(
    slots,
    HostWeekGridItem,
    props.onSelectJoinSlot,
    aveVotes,
  );

  return (
    <Container maxW="7xl" py={12}>
      <Breadcrumb
        spacing="8px"
        separator={<ChevronRightIcon color="gray.500" />}
      >
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Course</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink href={`/courses/${courseId}`}>
            {courseId}
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#">Host</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <WithForm
        isOpen={isOpen}
        onCreate={onCreateMeeting}
        onClose={onClose}
        timings={[]}
        numMeetings={14}
        startDate={startDate}
        onSelectStartDate={onSelectStartDate}
      />
      <Box pt={12}>
        <Heading mb={4}>Choose slots to host</Heading>
        <WeekGrid
          slotItems={slotItems}
          periodLen={periodLen}
          numPeriodsPerDay={numPeriodsPerDay}
        />
        <br />
        <Center>
          <Button onClick={onOpen}>Schedule meeting</Button>
        </Center>
      </Box>
    </Container>
  );
}

HostCourse.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      courseId: PropTypes.string,
    }),
  }),
  slots: PropTypes.array,
  onSelectJoinSlot: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  coursePage: makeSelectCoursePage(),
  slots: makeSelectSlots(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSelectJoinSlot: (day, id) => () => dispatch(selectJoinSlot(day, id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HostCourse);
