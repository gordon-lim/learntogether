/**
 *
 * CourseMaterial
 *
 */

import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Heading,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { MdSettings, MdCheckCircle } from 'react-icons/md';

// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function CourseMaterial() {
  return (
    <Box>
      <Heading mb={4}>Course Materials</Heading>
      <Accordion allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton _expanded={{ bg: 'tomato', color: 'white' }}>
              <Box flex="1" textAlign="center">
                Week 1
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <h3>Welcome to Introduction to Psychology</h3>
            <List spacing={3} mt={4} ml={5}>
              <ListItem>
                <ListIcon as={MdCheckCircle} color="green.500" />
                Videos
                <b> 40min</b>
              </ListItem>
              <ListItem>
                <ListIcon as={MdCheckCircle} color="green.500" />
                Readings
              </ListItem>
              {/* You can also use custom icons from react-icons */}
              <ListItem>
                <ListIcon as={MdSettings} color="green.500" />
                Kahoots <b> 20min </b>
              </ListItem>
            </List>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton _expanded={{ bg: 'tomato', color: 'white' }}>
              <Box flex="1" textAlign="center">
                Week 2
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <h3>Development and Language</h3>
            <List spacing={3} mt={4} ml={5}>
              <ListItem>
                <ListIcon as={MdCheckCircle} color="green.500" />
                Videos
                <b> 40min</b>
              </ListItem>
              <ListItem>
                <ListIcon as={MdCheckCircle} color="green.500" />
                Readings
              </ListItem>
              {/* You can also use custom icons from react-icons */}
              <ListItem>
                <ListIcon as={MdSettings} color="green.500" />
                Kahoots <b> 20min </b>
              </ListItem>
            </List>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton _expanded={{ bg: 'tomato', color: 'white' }}>
              <Box flex="1" textAlign="center">
                Week 3
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <h3>Cognition</h3>
            <List spacing={3} mt={4} ml={5}>
              <ListItem>
                <ListIcon as={MdCheckCircle} color="green.500" />
                Videos
                <b> 50min</b>
              </ListItem>
              <ListItem>
                <ListIcon as={MdCheckCircle} color="green.500" />
                Readings
              </ListItem>
              {/* You can also use custom icons from react-icons */}
              <ListItem>
                <ListIcon as={MdSettings} color="green.500" />
                Kahoots <b> 10min </b>
              </ListItem>
            </List>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
}

CourseMaterial.propTypes = {};

export default CourseMaterial;
