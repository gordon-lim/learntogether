/**
 *
 * Asynchronously loads the component for Hero
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
