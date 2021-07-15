/**
 *
 * Join Course Page
 *
 */

import React, { memo } from 'react';
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
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectCoursePage, { makeSelectSlots } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { slotsToGridItem } from './utils';
import { selectJoinSlot } from './actions';
import { WeekGrid } from '../../components/Grid/WeekGrid';
import JoinWeekGridItem from './JoinWeekGridItem';

function JoinCourse(props) {
  useInjectReducer({ key: 'coursePage', reducer });
  useInjectSaga({ key: 'coursePage', saga });

  const { courseId } = props.match.params; //eslint-disable-line
  const { slots } = props;

  // TODO: check if the user is authenticated

  const periodLen = 2; // Sample
  // TODO: Find out the duration of each period of the course, eg 0.5, 1, 1.5, 2, 3
  const numPeriodsPerDay = Math.floor(24 / periodLen);
  // TODO: get data about the available timings for the course
  // const slots = joinSlots;
  const slotItems = slotsToGridItem(
    slots,
    JoinWeekGridItem,
    props.onSelectJoinSlot,
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
          <BreadcrumbLink href="#">Join</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Box pt={12}>
        <Heading mb={4}>Choose slots to join</Heading>
        <WeekGrid
          slotItems={slotItems}
          periodLen={periodLen}
          numPeriodsPerDay={numPeriodsPerDay}
        />
        <br />
        <Center>
          <Button>Save Votes</Button>
        </Center>
      </Box>
    </Container>
  );
}

JoinCourse.propTypes = {
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
)(JoinCourse);
