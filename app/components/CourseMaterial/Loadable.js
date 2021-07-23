/**
 *
 * Asynchronously loads the component for CourseMaterial
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
