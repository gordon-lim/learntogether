/**
 *
 * View Course Page
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';

import WithBackgroundImage from 'components/Hero/WithBackgroundImage';
import CourseMaterial from 'components/CourseMaterial';

export default function ViewCourse(props) {
  const { courseId } = props.match.params; // esli

  // TODO: get the relevant course data based on the course id
  // const bgUrl = '';
  const title = 'React Bootcamp';
  const leftButtonText = 'View course timings';
  const leftButtonLink = `/courses/${String(courseId)}/join`;
  const rightButtonText = 'Host this course';
  const rightButtonLink = `/courses/${String(courseId)}/host`;

  return (
    <VStack>
      <WithBackgroundImage
        title={title}
        leftButtonText={leftButtonText}
        leftButtonLink={leftButtonLink}
        rightButtonText={rightButtonText}
        rightButtonLink={rightButtonLink}
      />
      <Container maxW="7xl" py={12}>
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
      <Container maxW="7xl" py={12}>
        <CourseMaterial />
      </Container>
    </VStack>
  );
}

ViewCourse.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      courseId: PropTypes.string,
    }),
  }),
};
