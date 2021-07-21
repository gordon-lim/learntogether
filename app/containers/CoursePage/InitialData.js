/**
 *
 * InitialData
 *
 */

import { PERIOD_LEN } from './constants';

export function getInitialData() {
  const joinSlots = [];
  const hostSlots = [];
  for (let day = 0; day < 7; day += 1) {
    const dayJoinSlots = [];
    const dayHostSlots = [];
    const numPeriodsPerDay = Math.floor(24 / PERIOD_LEN);
    for (let period = 0; period < numPeriodsPerDay; period += 1) {
      dayJoinSlots.push({ id: period, availSlots: [], selected: false });
      dayHostSlots.push({ id: period, votes: [], selected: false });
    }
    joinSlots.push(dayJoinSlots);
    hostSlots.push(dayHostSlots);
  }
  return { joinSlots, hostSlots };
}
