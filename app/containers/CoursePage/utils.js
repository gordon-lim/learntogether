/**
 *
 * Custom utils for CoursePage
 *
 */
import React from 'react';
import { PERIOD_LEN } from './constants';

/**
 * Converts the existing slots array to an array of components
 *
 * @param {2d array} slots
 * @param {React Component} component
 * @returns A 2d Array populated by the component representation of the slots
 *
 */
export function slotsToGridItem(slots, Component, onClick, aveVotes = 0) {
  return slots.map((daySlots, day) =>
    daySlots.map(slot => (
      <Component
        day={day}
        slot={slot}
        aveVotes={aveVotes}
        onClick={onClick(day, slot.id)}
      />
    )),
  );
}

/**
 * Converts the period into its starting hour
 *
 * @param {integer} period
 * @param {number} periodLen
 * @returns The starting hour of the period
 *
 */
export function periodToHour(period) {
  const timeMins = period * PERIOD_LEN * 60;
  const hour = String(Math.floor(timeMins / 60)).padStart(2, '0');
  const mins = String(timeMins % 60).padStart(2, '0');
  return hour + mins;
}

export function indToDay(dayInd) {
  const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[dayInd];
}

export function getAveVotes(slots, numPeriodsPerDay) {
  const sumVotes = slots
    .reduce((a, b) => a.concat(b))
    .reduce((acc, obj) => acc + obj.numVots, 0);
  const aveVotes = Math.floor(sumVotes / (numPeriodsPerDay * 7));
  return aveVotes;
}

export function containsObject(obj, list) {
  for (let i = 0; i < list.length; i += 1) {
    if (list[i] === obj) {
      return true;
    }
  }

  return false;
}

/**
 * Returns the next day of the of the week with reference to the date given
 * This will result in today if day is 1 today is Monday
 * @param {int} day
 * @param {Date} refDate
 * @return {Date}
 */
export function getNextDayOfTheWeek(day, refDate, excludeToday = true) {
  const resDate = new Date(refDate.getTime());
  resDate.setDate(
    refDate.getDate() +
      +!!excludeToday +
      ((day + 7 - refDate.getDay() - +!!excludeToday) % 7),
  );
  return resDate;
}
