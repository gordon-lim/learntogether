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
  Stack,
  Table,
  Tbody,
  Td,
  Tr,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { firebaseConnect, useFirebase } from 'react-redux-firebase';
import JoinWeekGridItem from 'components/TableComponent/JoinWeekGridItem';
import ModalWithCards from 'components/Modal/ModalWithCards';
import CardWithExtraContents from 'components/Card/CardWithExtraContents';
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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [slotChosen, setSlotChosen] = useState({ day: 0, period: 0 });
  const [selectedPeriodAvailSlots, setSelectedPeriodAvailSlots] = useState([]);

  const setSuccess = msg =>
    toast({
      title: 'Success!',
      description: msg.toString(),
      status: 'success',
      isClosable: true,
    });
  const setError = msg =>
    toast({
      title: 'Error!',
      description: msg.toString(),
      status: 'error',
      isClosable: true,
    });

  useEffect(() => {
    // Adds the available slots to the grid table
    for (let i = 0; i < availSlots.length; i += 1) {
      const { day, period } = availSlots[i].value.slot;
      addAvail(day, period, availSlots[i]);
    }

    // Filters only the available slots in the period selected by the user
    setSelectedPeriodAvailSlots(
      availSlots.filter(data => {
        // Currently limit to only allow hosting with one slot per week
        const timeSlot = data.value.slot;
        return (
          timeSlot.day === slotChosen.day &&
          timeSlot.period === slotChosen.period
        );
      }),
    );
  }, [availSlots, slotChosen]);

  const onSaveVote = async evt => {
    evt.preventDefault();

    try {
      const results = [];
      for (let i = 0; i < votedJoinSlots.length; i += 1) {
        const { day, period } = votedJoinSlots[i];
        results.push(
          firebase.push('coursesVoted', {
            dateCreated: new Date().toDateString(),
            userId: auth.uid,
            courseId,
            day,
            period,
          }),
        );
      }
      await Promise.all(results);
      setSuccess('Voted saved.');
    } catch (err) {
      setError(err);
    }
  };

  const onSelectAvailSlot = (day, period) => () => {
    setSlotChosen({ day, period });
    // Opens the available slots modal
    onOpen();
  };

  const onJoinMeeting = courseHostedId => async () => {
    firebase
      .push('coursesJoined', {
        dateCreated: new Date().toString(),
        userId: auth.uid,
        courseId,
        courseHostedId,
      })
      .then(() => setSuccess('Joined course'))
      .catch(err => setError(err));
  };

  const numPeriodsPerDay = Math.floor(24 / PERIOD_LEN);
  const slotItems = joinSlots.map((daySlots, day) =>
    daySlots.map(slot => (
      <JoinWeekGridItem
        slot={slot}
        onClick={onSelectJoinSlot(day, slot.id)}
        onSelectAvailSlot={onSelectAvailSlot(day, slot.id)}
      />
    )),
  );

  const timingProps = selectedPeriodAvailSlots.map(availSlot => {
    const title = new Date(availSlot.value.startDate).toDateString();
    const hostString = `Hosted by: ${availSlot.value.hostDisplayName}`;
    const extraContent = (
      <Stack>
        <Table>
          <Tbody>
            <Tr>
              <Td>Number of meetings</Td>
              <Td isNumeric>{availSlot.value.numMeetings.toString()}</Td>
            </Tr>
            <Tr>
              <Td>Participant Limit</Td>
              <Td isNumeric>{availSlot.value.participantLimit.toString()}</Td>
            </Tr>
          </Tbody>
        </Table>
        <Center>
          <Button onClick={onJoinMeeting(availSlot.key)}>Join</Button>
        </Center>
      </Stack>
    );
    return {
      title,
      desc: hostString,
      extraContent,
    };
  });

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

      <ModalWithCards
        isOpen={isOpen}
        onClose={onClose}
        title="Available Timings"
        CardComponent={CardWithExtraContents}
        cardProps={timingProps}
      />

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
