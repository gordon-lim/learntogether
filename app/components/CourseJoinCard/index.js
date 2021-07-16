/**
 *
 * CourseJoinCard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

function CourseJoinCard({ data }) {
  return <div>{data.foo}</div>;
}

CourseJoinCard.propTypes = {
  data: PropTypes.object,
};

export default CourseJoinCard;
