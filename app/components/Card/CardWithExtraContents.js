/**
 *
 * CourseJoinCard
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Stack, HStack, Heading, Text } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
// import styled from 'styled-components';

function CardWithExtraContents({ title, desc, extraContent }) {
  const [readMore, setReadMore] = useState(false);

  const readMoreButton = readMore ? <ChevronUpIcon /> : <ChevronDownIcon />;

  return (
    <Stack>
      <HStack>
        <Box mr="auto">
          <Heading fontSize="xl">{title}</Heading>
          <Text>{desc}</Text>
        </Box>
        <Button onClick={() => setReadMore(!readMore)}>{readMoreButton}</Button>
      </HStack>
      {readMore && extraContent}
    </Stack>
  );
}

CardWithExtraContents.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  extraContent: PropTypes.object,
};

export default CardWithExtraContents;
