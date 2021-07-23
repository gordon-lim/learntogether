/**
 *
 * Hero
 *
 */

// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  IconButton,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { memo } from 'react';
import { Blob } from './Blob';
import { PlayIcon } from './PlayIcon';

function Hero() {
  return (
    <Box
      bgColor={useColorModeValue(
        'rgb(237 242 247 / 0.5)',
        'rgb(23 25 35 / 0.4)',
      )}
      mb={12}
    >
      <Container maxW="8xl" pb="5rem">
        <Stack
          align="center"
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
          direction={{ base: 'column', md: 'row' }}
        >
          <Stack flex={1} spacing={{ base: 5, md: 10 }}>
            <Heading
              lineHeight={1.1}
              fontWeight={700}
              fontSize={{ base: '4xl', sm: '5xl', lg: '6xl' }}
            >
              <Text
                as="span"
                position="relative"
                _after={{
                  content: "''",
                  width: 'full',
                  height: '30%',
                  position: 'absolute',
                  bottom: 1,
                  left: 0,
                  bg: useColorModeValue('red.300', 'red.500'),
                  zIndex: -1,
                }}
              >
                Learn Everywhere,
              </Text>
              <br />
              <Text as="span" color="red.500">
                Learn Together!
              </Text>
            </Heading>
            <Text color="gray.500" fontSize={{ md: 'lg' }}>
              Online courses have taken the world by storm. We help you find
              like-minded individuals to learn together interactively and in
              real-time.
            </Text>
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={{ base: 'column', sm: 'row' }}
            >
              <Button
                rounded="md"
                size="lg"
                fontWeight="semibold"
                px={6}
                colorScheme="red"
                color="white"
                bg={useColorModeValue('red.400', 'red.500')}
              >
                Get started
              </Button>
              <Button
                rounded="md"
                size="lg"
                fontWeight="normal"
                px={6}
                leftIcon={
                  <PlayIcon
                    h={4}
                    w={4}
                    color={useColorModeValue('gray.400', 'gray.300')}
                  />
                }
              >
                How It Works
              </Button>
            </Stack>
          </Stack>
          <Flex
            flex={1}
            justify="center"
            align="center"
            position="relative"
            w="full"
          >
            <Blob
              w="150%"
              h="150%"
              position="absolute"
              top="-20%"
              left={0}
              zIndex={-1}
              color={useColorModeValue('red.100', 'red.500')}
            />
            <Box
              position="relative"
              height="400px"
              rounded="xl"
              boxShadow="2xl"
              width="full"
              overflow="hidden"
            >
              <IconButton
                aria-label="Play Button"
                variant="ghost"
                _hover={{ bg: 'transparent' }}
                icon={<PlayIcon w={12} h={12} />}
                size="lg"
                color="white"
                position="absolute"
                left="50%"
                top="50%"
                transform="translateX(-50%) translateY(-50%)"
              />
              <Image
                alt="Hero Image"
                fit="cover"
                align="center"
                w="100%"
                h="100%"
                src="https://images.pexels.com/photos/6335/man-coffee-cup-pen.jpg?auto=compress"
              />
            </Box>
          </Flex>
        </Stack>
      </Container>
    </Box>
  );
}

Hero.propTypes = {};

export default memo(Hero);
