/**
 *
 * Host Course Page
 *
 */

import React, { memo, useEffect, useState } from 'react';
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
  useToast,
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import WithForm from 'components/Modal/WithForm';
import { firebaseConnect, useFirebase } from 'react-redux-firebase';
import makeSelectCoursePage, {
  makeSelectCourseId,
  makeSelectHostSlots,
  makeSelectSelectedHostSlots,
  makeSelectSlotVotes,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getAveVotes } from './utils';
import { addVoteSlots, selectHostSlot } from './actions';
import { WeekGrid } from '../../components/Grid/WeekGrid';
import HostWeekGridItem from '../../components/TableComponent/HostWeekGridItem';
import { PERIOD_LEN } from './constants';

function HostCourse({
  auth,
  courseId,
  slotVotes,
  hostSlots,
  selectedHostSlots,
  onSelectHostSlot,
  addVote,
}) {
  useInjectReducer({ key: 'coursePage', reducer });
  useInjectSaga({ key: 'coursePage', saga });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [startDate, setStartDate] = useState(new Date());
  const [displayName, setDisplayName] = useState('');
  const [numMeetings, setNumMeetings] = useState(14);
  const [participantLimit, setParticipantLimit] = useState(10);

  const firebase = useFirebase();
  const toast = useToast();

  useEffect(() => {
    for (let i = 0; i < slotVotes.length; i += 1) {
      const { day, period } = slotVotes[i].value;
      addVote(day, period, slotVotes[i]);
    }
  }, [slotVotes]);

  // TODO: check if the user has an access token
  // if (!auth.zoomTokenManager || !auth.zoomTokenManager.accessToken) {
  //   window.location.href = '/api/oauth/zoom';
  // }
  // TODO: check if the access token is still valid
  // TODO: if no access token redirect to oauth to get one

  const onCreateMeeting = async evt => {
    evt.preventDefault();

    try {
      await firebase.push('coursesHosted', {
        dateCreated: new Date().toDateString(),
        userId: auth.uid,
        hostDisplayName: displayName,
        courseId,
        startDate: startDate.toString(),
        periods: JSON.stringify(selectedHostSlots),
        numMeetings,
        participantLimit,
      });
    } catch (errors) {
      // console.log(errors);
    }
    toast({
      title: 'Success!',
      description: 'Hosted a new course.',
      status: 'success',
      isClosable: true,
    });
  };

  const numPeriodsPerDay = Math.floor(24 / PERIOD_LEN);
  const slotItems = hostSlots.map((daySlots, day) =>
    daySlots.map(slot => (
      <HostWeekGridItem
        day={day}
        slot={slot}
        aveVotes={getAveVotes(hostSlots, numPeriodsPerDay)}
        onClick={onSelectHostSlot(day, slot.id)}
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
        timings={selectedHostSlots}
        displayName={displayName}
        setDisplayName={setDisplayName}
        numMeetings={numMeetings}
        setNumMeetings={setNumMeetings}
        participantLimit={participantLimit}
        setParticipantLimit={setParticipantLimit}
        startDate={startDate}
        setStartDate={setStartDate}
      />
      <Box pt={12}>
        <Heading mb={4}>Choose slots to host</Heading>
        <WeekGrid
          scrollable
          height="100px"
          slotItems={slotItems}
          periodLen={PERIOD_LEN}
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
  auth: PropTypes.object,
  courseId: PropTypes.string,
  slotVotes: PropTypes.array,
  hostSlots: PropTypes.array,
  selectedHostSlots: PropTypes.array,
  onSelectHostSlot: PropTypes.func,
  addVote: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  coursePage: makeSelectCoursePage(),
  courseId: makeSelectCourseId(),
  hostSlots: makeSelectHostSlots(),
  selectedHostSlots: makeSelectSelectedHostSlots(),
  slotVotes: makeSelectSlotVotes(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSelectHostSlot: (day, id) => () => dispatch(selectHostSlot(day, id)),
    addVote: (day, id, slot) => dispatch(addVoteSlots(day, id, slot)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  firebaseConnect(props => [
    {
      path: 'coursesVoted',
      queryParams: ['orderByChild=courseId', props.match.params.courseId],
    },
  ]),
  withConnect,
  memo,
)(HostCourse);
