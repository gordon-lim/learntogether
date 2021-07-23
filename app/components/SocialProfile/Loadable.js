/**
 *
 * Asynchronously loads the component for SocialProfile
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
