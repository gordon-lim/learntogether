/**
 *
 * Custom utils for CoursePage
 *
 */
import React from 'react';

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
