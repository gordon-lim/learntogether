/**
 *
 * Host Course Page
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Container } from '@chakra-ui/react';

import { WeekGrid } from './WeekGrid';

export default function HostCourse(props) {
  const { courseId } = props.match.params; //eslint-disable-line

  return (
    <Container maxW="7xl" py={12}>
      <WeekGrid />
    </Container>
  );
}

HostCourse.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.string,
  }),
};
