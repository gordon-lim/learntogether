import { BellIcon } from '@chakra-ui/icons';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  makeSelectCourses,
  makeSelectFirebaseAuth,
  makeSelectNotifs,
} from 'containers/App/selectors';
import { indToDay, periodToHour } from 'containers/CoursePage/utils';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { v4 } from 'uuid';

function Notification({ auth, courses, notifs }) {
  const [myNotifs, setMyNotifs] = useState([]);

  useEffect(() => {
    if (isLoaded(auth) && isLoaded(courses) && isLoaded(notifs)) {
      setMyNotifs(
        notifs
          .filter(n => n.value.userId === auth.uid)
          .map(n => {
            const { courseId, day, period } = n.value;
            let courseName = courses
              .filter(c => c.key === courseId)
              .map(c => c.value.title);
            courseName = courseName.length > 0 ? courseName[0] : 'undefined';
            return {
              title: `New ${courseName} course`,
              msg: `A new ${courseName} course has been hosted at ${indToDay(
                day,
              )} ${periodToHour(period)}h`,
              link: `/courses/${courseId}/join`,
            };
          }),
      );
    }
  }, [auth, courses, notifs]);

  return (
    <Menu>
      <Tooltip label="Notifications">
        <MenuButton
          as={BellIcon}
          boxSize="30px"
          mr={2}
          color={useColorModeValue('gray.700', 'gray.200')}
        />
      </Tooltip>
      <MenuList>
        {myNotifs.map(n => (
          <MenuItem key={v4()} as={Link} to={n.link}>
            {n.msg}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}

Notification.propTypes = {
  auth: PropTypes.object,
  courses: PropTypes.array,
  notifs: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  auth: makeSelectFirebaseAuth(),
  courses: makeSelectCourses(),
  notifs: makeSelectNotifs(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  firebaseConnect(() => [
    {
      path: 'coursesVoted',
    },
    {
      path: 'notifications',
    },
  ]),
  withConnect,
)(Notification);
