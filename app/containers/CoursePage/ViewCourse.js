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
import React, { memo } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectCurrentCourse } from './selectors';

function ViewCourse({
  auth,
  currentCourse,
  match: {
    params: { courseId },
  },
}) {
  const courseDict = currentCourse.reduce(
    (arr, obj) => ({ ...arr, [obj.key]: obj.value }),
    {},
  );
  // TODO: get the relevant course data based on the course id
  // const bgUrl = '';
  // const { title } = courses;
  const { title } = courseDict;
  const leftButtonText = 'View course timings';
  const leftButtonLink = `/courses/${String(courseId)}/join`;
  const rightButtonText = 'Host this course';
  const rightButtonLink = `/courses/${String(courseId)}/host`;

  const GuestItems = () => (
    <>
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
    </>
  );

  const JoinedItems = () => (
    <>
      <WithBackgroundImage title={title} leftButtonText="Joined" />
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
      </Container>{' '}
    </>
  );

  const HostItems = () => (
    <>
      <WithBackgroundImage
        title={title}
        rightButtonText="Host of this course"
      />
      <Container maxW="8xl" py={12}>
        <CourseMaterial />
      </Container>{' '}
    </>
  );

  let DisplayItems = GuestItems;
  // Ensure auth is loaded

  // eslint-disable-line
  // Check Joined
  if (isLoaded(auth)) {
    // Is the field there?
    const jref = firebase.database().ref('coursesJoined');

    if (jref) {
      jref
        .orderByChild('userId')
        .equalTo(auth.uid)
        .on('value', snapshot => {
          snapshot.forEach(childSnapshot => {
            const courseIdJoined = childSnapshot.child('courseId').val();
            if (courseIdJoined === courseId) {
              DisplayItems = JoinedItems;
            }
          });
        });
    }

    // eslint-disable-line
    // Check Hosting
    const href = firebase.database().ref('coursesHosted');

    if (href) {
      href
        .orderByChild('userId')
        .equalTo(auth.uid)
        .on('value', snapshot => {
          snapshot.forEach(childSnapshot => {
            const courseIdHosted = childSnapshot.child('courseId').val();
            if (courseIdHosted === courseId) {
              // console.log('already hosted');
              DisplayItems = HostItems;
            }
          });
        });
    }
  }

  return (
    <VStack>
      <DisplayItems />
    </VStack>
  );
}

ViewCourse.propTypes = {
  auth: PropTypes.object,
  currentCourse: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

const mapStateToProps = createStructuredSelector({
  auth: makeSelectFirebaseAuth(),
  currentCourse: makeSelectCurrentCourse(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  firebaseConnect(props => [
    {
      path: `courses/${props.match.params.courseId}`,
      storeAs: 'currentCourse',
    },
  ]),
  withConnect,
  memo,
)(ViewCourse);
