/**
 *
 * CourseJoinCard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

function CourseJoinCard({ data }) {
  console.log('card loaded');
  return <div>{data.foo}</div>;
}

CourseJoinCard.propTypes = {
  data: PropTypes.string,
};

export default CourseJoinCard;
