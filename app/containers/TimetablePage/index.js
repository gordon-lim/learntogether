/**
 *
 * TimetablePage
 *
 */

import { Container, useDisclosure, useToast } from '@chakra-ui/react';
import { isEmpty } from '@chakra-ui/utils';
import PlainModal from 'components/Modal/PlainModal';
import { PERIOD_LEN } from 'containers/CoursePage/constants';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { memo, useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { addEvent, clearEvents } from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectTimetablePage, {
  makeSelectAllCoursesHosted,
  makeSelectAllCoursesJoined,
  makeSelectCourses,
  // makeSelectCoursesHosted,
  // makeSelectCoursesJoined,
  makeSelectEvents,
} from './selectors';
import { getEleByKey, getNextDayOfTheWeek } from './utils';

const localizer = momentLocalizer(moment);

export function TimetablePage({
  auth, // eslint-disable-line
  courses,
  // coursesJoined,
  allCoursesJoined,
  // coursesHosted,
  allCoursesHosted,
  events,
  clearEvts,
  addEvt,
}) {
  useInjectReducer({ key: 'timetablePage', reducer });
  useInjectSaga({ key: 'timetablePage', saga });

  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalTitle, setModalTitle] = useState('');
  const [modalDesc, setModalDesc] = useState('');

  // eslint-disable-next-line
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

  function parseCoursesHosted(evt) {
    const { courseId } = evt;
    const course = getEleByKey(courses, courseId);
    const title = course.name || 'Course';
    const { day, period } = evt.slot;
    const startHour = period * PERIOD_LEN;
    const { numMeetings } = evt;

    const evts = [];
    let startDate = new Date(evt.startDate);
    for (let i = 0; i < numMeetings; i += 1) {
      const endDate = new Date(startDate.getTime());
      startDate.setHours(startHour, 0, 0, 0);
      endDate.setHours(startHour + 1, 0, 0, 0);
      evts.push({
        title,
        start: startDate,
        end: endDate,
        description: evt.zoomUrl,
      });
      startDate = getNextDayOfTheWeek(day, startDate);
    }
    return evts;
  }

  useEffect(() => {
    if (isLoaded(auth) && !isEmpty(auth)) {
      try {
        const coursesJoined = allCoursesJoined.filter(
          evt => evt.value.userId === auth.uid,
        );
        const coursesHosted = allCoursesHosted.filter(
          evt => evt.value.userId === auth.uid,
        );

        clearEvts();

        // Adds all the meetings that are hosted by the user himself
        coursesHosted.forEach(evt => {
          addEvt(parseCoursesHosted(evt.value));
        });

        // Adds all the meetings that the user has joined
        coursesJoined.forEach(evt => {
          const { courseHostedId } = evt.value;
          const coursesHostedEvt = getEleByKey(
            allCoursesHosted,
            courseHostedId,
          );
          addEvt(parseCoursesHosted(coursesHostedEvt));
        });
      } catch (err) {
        setError(err);
      }
    }
  }, [auth, courses, allCoursesJoined, allCoursesHosted]);

  const onSelectEvent = event => {
    setModalTitle(event.title);
    setModalDesc(event.description);
    onOpen();
  };

  return (
    <div>
      <Helmet>
        <title>TimetablePage</title>
        <meta name="description" content="Description of Timetable Page" />
      </Helmet>
      <Container maxW="8xl" paddingTop="4em">
        <PlainModal
          isOpen={isOpen}
          onClose={onClose}
          title={modalTitle}
          description={modalDesc}
        />
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={events}
          style={{ height: '100vh' }}
          onSelectEvent={onSelectEvent}
        />
      </Container>
    </div>
  );
}

TimetablePage.propTypes = {
  auth: PropTypes.object,
  courses: PropTypes.array,
  // coursesJoined: PropTypes.array,
  allCoursesJoined: PropTypes.array,
  // coursesHosted: PropTypes.array,
  allCoursesHosted: PropTypes.array,
  events: PropTypes.array,
  clearEvts: PropTypes.func,
  addEvt: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  timetablePage: makeSelectTimetablePage(),
  courses: makeSelectCourses(),
  // coursesJoined: makeSelectCoursesJoined(),
  allCoursesJoined: makeSelectAllCoursesJoined(),
  // coursesHosted: makeSelectCoursesHosted(),
  allCoursesHosted: makeSelectAllCoursesHosted(),
  events: makeSelectEvents(),
});

function mapDispatchToProps(dispatch) {
  return {
    clearEvts: () => dispatch(clearEvents()),
    addEvt: event => dispatch(addEvent(event)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  // eslint-disable-next-line
  firebaseConnect(props => [
    {
      path: 'courses',
    },
    // {
    //   path: 'coursesJoined',
    //   queryParams: ['orderByChild=userId', props.auth.uid],
    // },
    {
      path: 'coursesJoined',
      storeAs: 'allCoursesJoined',
    },
    // {
    //   path: 'coursesHosted',
    //   queryParams: ['orderByChild=userId', props.auth.uid],
    // },
    {
      path: 'coursesHosted',
      storeAs: 'allCoursesHosted',
    },
  ]),
  withConnect,
  memo,
)(TimetablePage);
