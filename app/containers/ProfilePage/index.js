/**
 *
 * ProfilePage
 *
 */

import {
  Box,
  Button,
  Grid,
  Img,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import MyCoursesCarousel from 'components/Carousel/MyCoursesCarousel';
import PastCoursesCarousel from 'components/Carousel/PastCoursesCarousel';
import PropTypes from 'prop-types';
import React, { memo, useState } from 'react';
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

  const [followed, setFollowed] = useState(false);

  return (
    <Box bgColor={useColorModeValue('white.400', 'gray.800')} pt="4em">
      <Helmet>
        <title>Profile</title>
        <meta name="description" content="Description of Profile Page" />
      </Helmet>
      <Grid
        templateColumns="1fr minmax(300px, 3fr)"
        maxW="7xl"
        m="0 auto"
        gap={5}
      >
        <Box textAlign="center">
          <Img
            src={auth.photoURL || Profile}
            alt="profile"
            w="100%"
            rounded="100%"
            mb={9}
          />
          <Button onClick={() => setFollowed(true)} isDisabled={followed}>
            {followed ? 'Followed!' : 'Follow me!'}
          </Button>
        </Box>
        <Stack spacing={10}>
          <MyCoursesCarousel />
          <PastCoursesCarousel />
        </Stack>
      </Grid>
    </Box>
  );
}

ProfilePage.propTypes = {
  auth: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({});

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
