/**
 *
 * ProfilePage
 *
 */

import {
  Box,
  Button,
  Grid,
  Heading,
  Img,
  useColorModeValue,
} from '@chakra-ui/react';
import CourseCard from 'components/Card/CourseCard';
import Carousel from 'components/Carousel';
import { details } from 'containers/HomePage';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import Profile from '../../images/Profile.svg';
import reducer from './reducer';
import saga from './saga';

export function ProfilePage({ auth }) {
  useInjectReducer({ key: 'profilePage', reducer });
  useInjectSaga({ key: 'profilePage', saga });

  return (
    <Box bgColor={useColorModeValue('white', 'gray.600')}>
      <Helmet>
        <title>ProfilePage</title>
        <meta name="description" content="Description of ProfilePage" />
      </Helmet>
      <Grid templateColumns="1fr 3fr" maxW="7xl" m="0 auto" py={12} gap={3}>
        <Box textAlign="center">
          <Img src={auth.photoURL || Profile} alt="profile" w="100%" />
          <Button>Follow me!</Button>
        </Box>
        <Box>
          <Heading>My Courses</Heading>
          <Carousel CardComponent={CourseCard} details={details} />
          <Heading>Past Courses</Heading>
          <Carousel CardComponent={CourseCard} details={details} />
        </Box>
      </Grid>
    </Box>
  );
}

ProfilePage.propTypes = {
  auth: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  // auth: makeSelectFirebaseAuth(),
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
)(ProfilePage);
