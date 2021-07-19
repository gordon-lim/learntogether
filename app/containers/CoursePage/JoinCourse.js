/**
 *
 * Join Course Page
 *
 */

import { ChevronRightIcon } from '@chakra-ui/icons';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Center,
  Container,
  Heading,
  useToast,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React, { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { firebaseConnect, useFirebase } from 'react-redux-firebase';

import JoinWeekGridItem from 'components/TableComponent/JoinWeekGridItem';
import { WeekGrid } from '../../components/Grid/WeekGrid';
import { addAvailSlots, selectJoinSlot } from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectCoursePage, {
  makeSelectAvailSlots,
  makeSelectCourseId,
  makeSelectJoinSlots,
  makeSelectVotedJoinSlots,
} from './selectors';
import { PERIOD_LEN } from './constants';

function JoinCourse({
  auth,
  courseId,
  availSlots,
  joinSlots,
  votedJoinSlots,
  onSelectJoinSlot,
  addAvail,
}) {
  useInjectReducer({ key: 'coursePage', reducer });
  useInjectSaga({ key: 'coursePage', saga });

  const firebase = useFirebase();
  const toast = useToast();

  useEffect(() => {
    for (let i = 0; i < availSlots.length; i += 1) {
      const periods = JSON.parse(availSlots[i].value.periods);
      for (let j = 0; j < periods.length; j += 1) {
        const { day, period } = periods[j];
        addAvail(day, period, availSlots[i]);
      }
    }
  }, [availSlots]);

  const onSaveVote = async evt => {
    evt.preventDefault();

    try {
      for (let i = 0; i < votedJoinSlots.length; i += 1) {
        const { day, period } = votedJoinSlots[i];
        firebase.push('coursesVoted', {
          dateCreated: new Date().toDateString(),
          userId: auth.uid,
          courseId,
          day,
          period,
        });
      }
    } catch (errors) {
      // console.log(errors);
    }
    toast({
      title: 'Success!',
      description: 'Votes saved.',
      status: 'success',
      isClosable: true,
    });
  };

  const numPeriodsPerDay = Math.floor(24 / PERIOD_LEN);
  const slotItems = joinSlots.map((daySlots, day) =>
    daySlots.map(slot => (
      <JoinWeekGridItem
        day={day}
        slot={slot}
        onClick={onSelectJoinSlot(day, slot.id)}
      />
    )),
  );

  return (
    <Container maxW="7xl" py={12}>
      <Breadcrumb
        spacing="8px"
        separator={<ChevronRightIcon color="gray.500" />}
      >
        <BreadcrumbItem>
          <BreadcrumbLink as={RouterLink} to="/">
            Course
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink as={RouterLink} to={`/courses/${courseId}`}>
            {courseId}
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink as={RouterLink} to="#">
            Join
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Box pt={12}>
        <Heading mb={4}>Choose slots to join</Heading>
        <WeekGrid
          scrollable
          height="100px"
          slotItems={slotItems}
          periodLen={PERIOD_LEN}
          numPeriodsPerDay={numPeriodsPerDay}
        />
        <br />
        <Center>
          <Button onClick={onSaveVote}>Save Votes</Button>
        </Center>
      </Box>
    </Container>
  );
}

JoinCourse.propTypes = {
  auth: PropTypes.object,
  courseId: PropTypes.string,
  availSlots: PropTypes.array,
  joinSlots: PropTypes.array,
  votedJoinSlots: PropTypes.array,
  onSelectJoinSlot: PropTypes.func,
  addAvail: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  coursePage: makeSelectCoursePage(),
  courseId: makeSelectCourseId(),
  availSlots: makeSelectAvailSlots(),
  joinSlots: makeSelectJoinSlots(),
  votedJoinSlots: makeSelectVotedJoinSlots(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSelectJoinSlot: (day, id) => () => dispatch(selectJoinSlot(day, id)),
    addAvail: (day, id, slot) => dispatch(addAvailSlots(day, id, slot)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  firebaseConnect(props => [
    {
      path: 'coursesHosted',
      queryParams: ['orderByChild=courseId', props.match.params.courseId],
    },
  ]),
  withConnect,
  memo,
)(JoinCourse);
