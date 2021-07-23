import {
  IconButton,
  MenuButton,
  Menu,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { BellIcon } from '@chakra-ui/icons';
// import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'formik';
import { createStructuredSelector } from 'reselect';
import { makeSelectNotifs } from 'containers/HomePage/selectors';
import { propTypes } from 'react-autocomplete';

const Notification = ({ notifs }) => (
  <Menu>
    <MenuButton as={IconButton} icon={<BellIcon />} />
    <MenuList>
      {notifs.map(notif => (
        <MenuItem>{notif}</MenuItem>
      ))}
    </MenuList>
  </Menu>
);

Notification.propTypes = {
  notifs: propTypes.array,
};

const mapStateToProps = createStructuredSelector({
  votes: makeSelectNotifs(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  firebaseConnect(props => [
    {
      path: 'coursesVoted',
      queryParams: ['orderByChild=courseId', props.match.params.courseId],
    },
  ]),
  withConnect,
  memo,
)(Notification);
