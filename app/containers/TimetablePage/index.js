/**
 *
 * TimetablePage
 *
 */

import { Container } from '@chakra-ui/react';
import moment from 'moment';
import React, { memo } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import makeSelectTimetablePage, { makeSelectCoursesJoined } from './selectors';

const localizer = momentLocalizer(moment);

export function TimetablePage() {
  useInjectReducer({ key: 'timetablePage', reducer });
  useInjectSaga({ key: 'timetablePage', saga });

  const events = [];

  return (
    <div>
      <Helmet>
        <title>TimetablePage</title>
        <meta name="description" content="Description of TimetablePage" />
      </Helmet>
      <Container maxW="7xl" paddingTop="4em">
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

TimetablePage.propTypes = {};

const mapStateToProps = createStructuredSelector({
  timetablePage: makeSelectTimetablePage(),
  coursesJoined: makeSelectCoursesJoined(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(TimetablePage);
