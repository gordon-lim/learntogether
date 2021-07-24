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
  AspectRatio,
  List,
  ListItem,
  ListIcon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { MdSettings, MdCheckCircle } from 'react-icons/md';

// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function CourseMaterial() {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
            <h2>The Brain</h2>
            <List spacing={3} mt={4} ml={5}>
              <ListItem onClick={onOpen}>
                <ListIcon as={MdCheckCircle} color="green.500" />
                Video: The astonishing hypothesis
              </ListItem>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalCloseButton />
                  <ModalBody>
                    <AspectRatio maxW="2480px">
                      <iframe
                        title="The astonishing hypothesis"
                        src="https://d3c33hcgiwev3.cloudfront.net/8-zVxdPGEeisEhKURr0pTg.processed/full/240p/index.webm?Expires=1627084800&Signature=V00WQtE~KzaXiHvbgJG4jDj78eyOu2-cF0jls1Ar31hagpXnMVgBlJ8OiroRzW3v4Pa5uW2K08qUfS3jSD4jcQUsdeaTMgEUA8EPIOi6z3sAUqSIb-FeT3HWMp1MX1pe4uGZcifwGeayNv3StsYw5YTc3Q~1rqlX~iqf-5KWH1k_&Key-Pair-Id=APKAJLTNE6QMUY6HBC5A"
                        allowFullScreen
                      />
                    </AspectRatio>
                  </ModalBody>
                </ModalContent>
              </Modal>
              <ListItem>
                <ListIcon as={MdCheckCircle} color="green.500" />
                Video: Dualism
              </ListItem>
              <ListItem>
                <ListIcon as={MdCheckCircle} color="green.500" />
                Video: Neurons
              </ListItem>
              <ListItem>
                <ListIcon as={MdCheckCircle} color="green.500" />
                Video: Parts of the brain
              </ListItem>
              <ListItem>
                <ListIcon as={MdCheckCircle} color="green.500" />
                Video: Our two brains
              </ListItem>
              {/* You can also use custom icons from react-icons */}
              <ListItem>
                <ListIcon as={MdSettings} color="green.500" />
                <a
                  href="https://play.kahoot.it/v2/?quizId=6272fcbd-0472-4090-94e7-cc9caf9cc700"
                  target="_blank"
                >
                  Kahoot: Foundations
                </a>
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
