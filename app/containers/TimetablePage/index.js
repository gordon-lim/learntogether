/**
 *
 * TimetablePage
 *
 */

import { Container } from '@chakra-ui/react';
import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { firebaseConnect } from 'react-redux-firebase';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { PERIOD_LEN } from 'containers/CoursePage/constants';
import makeSelectTimetablePage, {
  makeSelectAllCoursesHosted,
  makeSelectCourses,
  makeSelectCoursesHosted,
  makeSelectCoursesJoined,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getNextDayOfTheWeek, getEleByKey } from './utils';

const localizer = momentLocalizer(moment);

export function TimetablePage({
  auth, // eslint-disable-line
  courses,
  coursesJoined,
  coursesHosted,
  allCoursesHosted,
}) {
  useInjectReducer({ key: 'timetablePage', reducer });
  useInjectSaga({ key: 'timetablePage', saga });

  const [events, setEvents] = useState([]);

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
      });
      startDate = getNextDayOfTheWeek(day, startDate);
    }
    return evts;
  }

  useEffect(() => {
    // Adds all the meetings that are hosted by the user himself
    coursesHosted.forEach(evt => {
      setEvents(events.concat(parseCoursesHosted(evt.value)));
    });

    // Adds all the meetings that the user has joined
    coursesJoined.forEach(evt => {
      const { courseHostedId } = evt.value;
      const coursesHostedEvt = getEleByKey(allCoursesHosted, courseHostedId);
      setEvents(events.concat(parseCoursesHosted(coursesHostedEvt)));
    });
  }, []);

  return (
    <div>
      <Helmet>
        <title>TimetablePage</title>
        <meta name="description" content="Description of TimetablePage" />
      </Helmet>
      <Container maxW="7xl" py={12}>
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={events}
          style={{ height: '100vh' }}
        />
      </Container>
    </div>
  );
}

TimetablePage.propTypes = {
  auth: PropTypes.object,
  courses: PropTypes.array,
  coursesJoined: PropTypes.array,
  coursesHosted: PropTypes.array,
  allCoursesHosted: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  timetablePage: makeSelectTimetablePage(),
  courses: makeSelectCourses(),
  coursesJoined: makeSelectCoursesJoined(),
  coursesHosted: makeSelectCoursesHosted(),
  allCoursesHosted: makeSelectAllCoursesHosted(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  firebaseConnect(props => [
    {
      path: 'coursesJoined',
      queryParams: ['orderByChild=userId', props.auth.uid],
    },
    {
      path: 'coursesHosted',
      queryParams: ['orderByChild=userId', props.auth.uid],
    },
    {
      path: 'coursesHosted',
      storeAs: 'allCoursesHosted',
    },
    {
      path: 'courses',
    },
  ]),
  withConnect,
  memo,
)(TimetablePage);
