/**
 *
 * CourseJoinCard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

function Card({ data }) {
  return <div>{data.foo}</div>;
}

Card.propTypes = {
  data: PropTypes.object,
};

export default Card;
