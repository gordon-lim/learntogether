/**
 *
 * View Course Page
 *
 */

import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';
import CourseMaterial from 'components/CourseMaterial';
import WithBackgroundImage from 'components/Hero/WithBackgroundImage';
import { makeSelectFirebaseAuth } from 'containers/App/selectors';
import firebase from 'firebase/app';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';
import { createStructuredSelector } from 'reselect';
function ViewCourse({
  auth,
  match: {
    params: { courseId },
  },
}) {
  // TODO: get the relevant course data based on the course id
  // const bgUrl = '';
  const title = 'React Bootcamp';
  const leftButtonText = 'View course timings';
  const leftButtonLink = `/courses/${String(courseId)}/join`;
  const rightButtonText = 'Host this course';
  const rightButtonLink = `/courses/${String(courseId)}/host`;

  // Ensure auth is loaded

  // eslint-disable-line
  // Check Joined
  if (isLoaded(auth)) {
    firebase
      .database()
      .ref('coursesJoined')
      .orderByChild('userId')
      .equalTo(auth.uid)
      .on('value', snapshot => {
        /* 
          snapshot.val()
          {
          MfGild1cIbjzDtCDr8u: {
            courseHostedId:
            courseId:
            dateCreated:
            userId:
          }    
          }
          */
        snapshot.forEach(childSnapshot => {
          const courseIdJoined = childSnapshot.child('courseId');
          if (courseIdJoined === courseId) {
            console.log('already joined');
          }
        });
      });

    // eslint-disable-line
    // Check Hosting
    firebase
      .database()
      .ref('coursesHosted')
      .orderByChild('userId')
      .equalTo(auth.uid)
      .on('value', snapshot => {
        /* 
      snapshot.val()
      {
      MfGild1cIbjzDtCDr8u: {
        courseHostedId:
        courseId:
        dateCreated:
        userId:
      }    
      }
      */
        snapshot.forEach(childSnapshot => {
          const courseIdHosted = childSnapshot.child('courseId');
          if (courseIdHosted === courseId) {
            // console.log('already hosted');
          }
        });
      });
  }

  return (
    <VStack>
      <WithBackgroundImage
        title={title}
        leftButtonText={leftButtonText}
        leftButtonLink={leftButtonLink}
        rightButtonText={rightButtonText}
        rightButtonLink={rightButtonLink}
      />
      <Container maxW="8xl" py={12}>
        <Box>
          <Heading mb={4}>About this course</Heading>
          <Text fontSize="md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce massa
            est, auctor vel condimentum eget, dignissim ut libero. Nulla commodo
            risus magna, sit amet consectetur eros porttitor quis. Nulla purus
            lacus, malesuada non condimentum quis, tristique nec lacus. Nunc a
            porta justo. Nunc lacinia lobortis leo, ac tincidunt lectus
            facilisis ac. Mauris nec pellentesque tellus. Etiam luctus sem erat,
            hendrerit laoreet lacus sodales vitae. Sed diam dui, volutpat vitae
            mollis sed, egestas in ligula. Ut risus mauris, vehicula ut
            fringilla a, maximus ut magna. Nullam pharetra mollis cursus. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. Fusce elit arcu,
            consectetur quis placerat at, imperdiet nec ipsum. Integer sagittis
            risus a porta pulvinar. Nullam rhoncus et nulla ut laoreet. In nec
            nunc id nisi tincidunt maximus vitae vitae felis. Nulla ac iaculis
            augue.
          </Text>
        </Box>
      </Container>
      <Container maxW="8xl" py={12}>
        <CourseMaterial />
      </Container>
    </VStack>
  );
}

ViewCourse.propTypes = {
  auth: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

const mapStateToProps = createStructuredSelector({
  auth: makeSelectFirebaseAuth(),
});

const withConnect = connect(mapStateToProps);

export default withConnect(ViewCourse);
