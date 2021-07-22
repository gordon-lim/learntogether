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
import { firebaseConnect, isLoaded, useFirebase } from 'react-redux-firebase';
import axios from 'axios';
import OauthPopup from 'components/OauthPopup';
import { ZOOM_CLIENT_ID, ZOOM_REDIRECT_URL } from 'utils/constants';
import makeSelectCoursePage, {
  makeSelectCourseId,
  makeSelectHostSlots,
  makeSelectSelectedHostSlots,
  makeSelectSlotVotes,
  makeSelectUserDetails,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getAveVotes, periodToHour } from './utils';
import { addVoteSlots, selectHostSlot } from './actions';
import { WeekGrid } from '../../components/Grid/WeekGrid';
import HostWeekGridItem from '../../components/TableComponent/HostWeekGridItem';
import { PERIOD_LEN } from './constants';

function HostCourse({
  auth,
  userDetails,
  courseId,
  slotVotes,
  hostSlots,
  selectedHostSlots,
  onSelectHostSlot,
  addVote,
}) {
  useInjectReducer({ key: 'coursePage', reducer });
  useInjectSaga({ key: 'coursePage', saga });

  const firebase = useFirebase();
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [canSchedule, setCanSchedule] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState(''); // eslint-disable-line
  const [startDate, setStartDate] = useState(new Date());
  const [displayName, setDisplayName] = useState('');
  const [numMeetings, setNumMeetings] = useState(14);
  const [participantLimit, setParticipantLimit] = useState(10);

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
    // Adds the vote details from firebase to the table
    for (let i = 0; i < slotVotes.length; i += 1) {
      const { day, period } = slotVotes[i].value;
      addVote(day, period, slotVotes[i]);
    }

    // Checks if the user has a zoom access token present in the firebase database
    if (isLoaded(userDetails)) {
      const userDeets = userDetails[auth.uid].reduce(
        (arr, obj) => ({ ...arr, [obj.key]: obj.value }),
        {},
      );
      if (
        userDeets.zoomTokenManager &&
        userDeets.zoomTokenManager.accessToken
      ) {
        setCanSchedule(true);
        setAccessToken(userDeets.zoomTokenManager.accessToken);
        setRefreshToken(userDeets.zoomTokenManager.refreshToken);
      }
    }
  }, [slotVotes, userDetails]);

  const zoomUrl = `https://zoom.us/oauth/authorize?response_type=code&client_id=${ZOOM_CLIENT_ID}&redirect_uri=${ZOOM_REDIRECT_URL}`;
  // eslint-disable-next-line
  const onZoomCode = async (zoomCode, params) => {
    try {
      await Promise.resolve(true);
    } catch (err) {
      setError(err);
    } finally {
      // Calls backend api to exchange code for the token
      axios
        .get('/api/zoom/getToken', {
          params: {
            code: zoomCode,
          },
        })
        .then(res => {
          const result = res.data;

          // Store the token in firebase
          firebase.update(`users/${auth.uid}`, {
            zoomTokenManager: {
              accessToken: result.access_token,
              refreshToken: result.refresh_token,
            },
          });

          setSuccess('Connected zoom account!');
        })
        .catch(err => setError(err.response.data.reason));
    }
  };

  const onCreateMeeting = async evt => {
    evt.preventDefault();

    try {
      // Only allow one meeting per week atm
      const dayString = startDate.toISOString().slice(0, 10);
      const startHour = periodToHour(selectedHostSlots[0].period);
      const startHourString = `${startHour.slice(0, 2)}:${startHour.slice(
        2,
        4,
      )}:00`;
      const days = selectedHostSlots[0].day;

      // Create a zoom meeting through the backend api
      const payload = {
        accessToken,
        topic: 'topic',
        startTime: `${dayString}T${startHourString}`,
        days,
        numMeetings,
      };
      const res = await axios
        .post('/api/zoom/createMeeting', payload)
        .catch(err => {
          firebase.remove(`users/${auth.uid}/zoomTokenManager`);
          throw new Error(err.response.data.error.message);
          // if (err.response.data.error.message === 'Access token is expired.') {
          //   setError('Token expired... Refreshing token');
          //   axios
          //     .post('/api/zoom/refreshToken', {
          //       params: { refreshToken: refreshToken },
          //     })
          //     .then(result => {
          //       setAccessToken(result.data.access_token);
          //       setRefreshToken(result.data.refresh_token);
          //       firebase.update(`users/${auth.uid}`, {
          //         zoomTokenManager: {
          //           accessToken: accessToken,
          //           refreshToken: refreshToken,
          //         },
          //       });
          //       return axios.post('/api/zoom/createMeeting', payload);
          //     });
          // } else {
          //   throw new Error(err);
          // }
        });
      const joinUrl = res.data.join_url;

      await firebase.push('coursesHosted', {
        dateCreated: new Date().toDateString(),
        userId: auth.uid,
        hostDisplayName: displayName,
        courseId,
        startDate: startDate.toString(),
        periods: JSON.stringify(selectedHostSlots),
        numMeetings,
        participantLimit,
        zoomUrl: joinUrl,
      });

      setSuccess('Hosted a new course!');
    } catch (err) {
      setError(err);
    }
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
          {canSchedule ? (
            <Button onClick={onOpen} disabled={selectedHostSlots.length <= 0}>
              Schedule meeting
            </Button>
          ) : (
            <OauthPopup
              url={zoomUrl}
              onCode={onZoomCode}
              onClose={() => null}
              title="Zoom Oauth"
            >
              <Button
                color="white"
                bg="blue.400"
                _hover={{
                  bg: 'blue.300',
                }}
              >
                Sign in with Zoom to Schedule a meeting
              </Button>
            </OauthPopup>
          )}
        </Center>
      </Box>
    </Container>
  );
}

HostCourse.propTypes = {
  auth: PropTypes.object,
  userDetails: PropTypes.object,
  courseId: PropTypes.string,
  slotVotes: PropTypes.array,
  hostSlots: PropTypes.array,
  selectedHostSlots: PropTypes.array,
  onSelectHostSlot: PropTypes.func,
  addVote: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  coursePage: makeSelectCoursePage(),
  userDetails: makeSelectUserDetails(),
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
    {
      path: `users/${props.auth.uid}`,
    },
  ]),
  withConnect,
  memo,
)(HostCourse);
