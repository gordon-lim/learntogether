/**
 *
 * TimetablePage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Container } from '@chakra-ui/react';
import makeSelectTimetablePage from './selectors';
import reducer from './reducer';
import saga from './saga';

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
  dispatch: PropTypes.func.isRequired, //eslint-disable-line
};

const mapStateToProps = createStructuredSelector({
  timetablePage: makeSelectTimetablePage(),
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
